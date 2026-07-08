---
comments: true
---

# Backend y API

## Stack Base

Patron observado:

* Python
* FastAPI
* SQLAlchemy para engine, sesiones y SQL textual
* Pydantic para contratos
* PostgreSQL como almacenamiento principal
* python-dotenv para configuracion local

Este stack favorece rapidez, claridad y bajo coste de mantenimiento.

## Organizacion de Capas

Usar esta separacion:

```text
app/api/routes/<domain>.py
  -> app/repositories/<domain>_repo.py
  -> db

app/api/routes/<domain>.py
  -> app/services/<capability>/
  -> app/repositories/
  -> db o archivos operativos
```

Las rutas no deberian contener SQL. Las rutas tampoco deberian contener transformaciones largas.

## Rutas FastAPI

Cada modulo de rutas debe:

* crear un `APIRouter`
* definir `prefix`
* definir `tags`
* declarar `response_model`
* inyectar la sesion con `Depends(get_db)` cuando necesite base de datos
* traducir ausencia de datos a `HTTPException(404)`
* delegar consultas a repositorios

Ejemplo conceptual:

```python
router = APIRouter(prefix="/clubs", tags=["clubs"])

@router.get("/{club_id}", response_model=ClubDetail)
def get_club(club_id: int, db: Session = Depends(get_db)):
    club = get_club_by_id(db, club_id)

    if club is None:
        raise HTTPException(status_code=404, detail="Club not found")

    return club
```

## Repositorios

Los repositorios encapsulan persistencia. En la mayoria de casos acceden a PostgreSQL, pero tambien pueden actuar como adaptadores de archivos operativos cuando el flujo aun vive en CSV.

Responsabilidades:

* consultas `SELECT`
* inserts y upserts
* conteos para paginacion
* carga de caches para pipelines
* conversion de filas a diccionarios
* sincronizacion simple de tablas relacion
* lectura y escritura controlada de archivos operativos cuando el storage temporal sea CSV

Patrones recomendados:

* funciones explicitas por operacion
* SQL parametrizado con `text()`
* `ON CONFLICT` para upserts idempotentes
* `RETURNING id, inserted` cuando el pipeline necesita saber si creo algo
* caches en memoria para procesos batch largos
* helpers `row_to_dict` y `rows_to_dict`

Evitar:

* SQL construido con interpolacion de strings
* commits dentro de funciones de repositorio si el caller ya controla la transaccion
* mezclar lectura HTTP, transformacion de datos y persistencia en una misma funcion
* esconder reglas de negocio complejas en un repositorio de archivo

### Repositorios DB vs File Adapters

Usar repositorio DB cuando el dato sea duradero, compartido, relacional o parte del producto.

Usar adaptador de archivo solo cuando:

* el flujo es interno o temprano
* el archivo es una cola, mapping, export o revision
* no hay concurrencia real
* existe una ruta clara para migrarlo a DB si crece

Si un archivo operativo pasa a ser usado por varios usuarios o necesita auditoria fuerte, promoverlo a tabla.

## Schemas Pydantic

Los schemas son contratos de frontera.

Usar un archivo por dominio o por subdominio:

```text
app/schemas/club.py
app/schemas/club_boat.py
app/schemas/admin_club_correction.py
```

Variantes comunes:

* `<Entity>` para detalle principal
* `<Entity>Detail` cuando el detalle incluye agregados
* `<Entity>ListItem` si se necesita separar lista y detalle
* `Paginated<Entity>` para respuestas paginadas
* `Create<Entity>` para creacion
* `Update<Entity>` para actualizacion parcial
* `<Entity>Options` para filtros, estados y selects de admin

Los tipos opcionales deben reflejar la realidad de la base de datos y de las fuentes externas. No marcar como obligatorio algo que llega incompleto.

## Dependencias

Las dependencias API centralizan preocupaciones transversales:

* sesion de base de datos
* autenticacion/admin
* permisos
* configuracion de request

Patron actual:

* `get_db()` abre y cierra sesion por request
* `verify_admin()` valida `x-admin-key`

Para futuros proyectos, mantener esta idea pero endurecerla:

* no permitir `ADMIN_KEY` vacio en produccion
* separar autenticacion real de llaves internas cuando haya usuarios
* devolver errores consistentes

## Servicios

`app/services/` contiene logica que no pertenece a una ruta ni a una consulta simple.

Tipos de servicios observados:

* normalizadores
* mappings
* sync
* agregacion
* masters
* exportaciones
* automapping
* email
* quality checks

Regla:

* si opera sobre una entidad y guarda/lee DB directamente, probablemente es repositorio
* si coordina varias entidades, transforma datos o aplica reglas, probablemente es servicio
* si ejecuta una secuencia operacional, probablemente es pipeline

## Paginacion

Para listas grandes, usar:

* `limit`
* `offset`
* `total`
* `data`

En backend:

* validar `limit` con minimo y maximo
* exponer `count_<entities>()`
* ordenar de forma estable

En frontend:

* conservar `limit` y `offset`
* mostrar controles reutilizables
* no traer todo si la entidad puede crecer

## Admin

Las rutas admin deben estar separadas por prefijo:

```text
/admin
/admin/corrections/<domain>
/admin/quality
```

Patrones recomendados:

* dependencias de autorizacion a nivel de router
* endpoints `GET` para lista paginada
* endpoints `PATCH` para actualizacion parcial
* endpoint `/options` para filtros, estados y ordenes soportados
* schemas especificos para items, updates y respuestas paginadas
* log de cambios cuando una accion humana modifica datos de revision
* dependencia de autorizacion aplicada en el `APIRouter`, no repetida endpoint a endpoint salvo excepcion justificada

## Search, Feedback y Quality

Search, feedback y quality son modulos transversales. No pertenecen a una entidad concreta aunque lean varias entidades.

Reglas:

* `search` agrega resultados de entidades canonicas y debe usar whitelist de fuentes buscables.
* `feedback` crea registros publicos y expone revision admin protegida.
* `quality` vive bajo `/admin/quality` y devuelve metricas explicables, issues agrupados y detalles paginados.

Ver [Modulos estandar](12-modulos-estandar.md).

## Registro de Rutas

Registrar routers en `app/api/main.py`.

Mantener `main.py` simple:

* configuracion FastAPI
* CORS
* inclusion de routers
* metadata de docs

Si `main.py` crece mucho, mover la lista de routers a un modulo dedicado.
