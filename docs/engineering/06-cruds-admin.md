---
comments: true
---

# CRUDs y Pantallas de Administracion

## Filosofia

Los CRUDs deben seguir un camino repetible de extremo a extremo.

Cada CRUD nuevo deberia poder implementarse mirando uno existente y tocando las mismas capas con nombres equivalentes.

## CRUD Publico Basico

Para una entidad principal:

```text
GET /<entities>
GET /<entities>/{id}
GET /<entities>/{id}/<related-entities>
```

Ejemplo:

```text
GET /clubs
GET /clubs/{club_id}
GET /clubs/{club_id}/boats
GET /clubs/{club_id}/regattas
```

Este patron crea una experiencia de exploracion:

* lista de entidades
* detalle de una entidad
* relaciones navegables

## CRUD Admin

Para administracion y correcciones:

```text
GET /admin/<resource>
POST /admin/<resource>
PATCH /admin/<resource>/{id}
GET /admin/<resource>/options
```

Para revisiones:

```text
GET /admin/corrections/<domain>
PATCH /admin/corrections/<domain>/{row_id}
GET /admin/corrections/<domain>/options
```

La ruta `/options` evita duplicar constantes de filtros, estados y ordenes entre backend y frontend.

## Respuestas Paginadas

Usar un shape consistente:

```json
{
  "data": [],
  "total": 0,
  "limit": 50,
  "offset": 0
}
```

Para admin, se pueden anadir metricas:

```json
{
  "data": [],
  "total": 0,
  "limit": 50,
  "offset": 0,
  "metrics": {}
}
```

## Filtros y Orden

En endpoints de lista:

* `limit`
* `offset`
* `q`
* `status`
* `sort_by`
* `sort_dir`
* filtros especificos del dominio

Validar en repositorio o servicio que `sort_by` pertenece a opciones permitidas. Nunca interpolar columnas recibidas directamente en SQL sin whitelist.

## Estados de Revision

Usar estados estables:

* `pending`
* `resolved`
* `unresolved`
* `ignored`

Semantica:

* `pending`: aun no revisado
* `resolved`: listo para entrar o permanecer en canonico
* `unresolved`: visto, pero no se puede resolver ahora
* `ignored`: no procesar como dato util

## Formularios de Correccion

Una tarjeta de correccion debe mostrar:

* dato raw
* sugerencia canonica
* confianza
* notas
* estado
* acciones rapidas de estado
* boton guardar
* warnings cuando el estado y los campos no encajan

Ejemplo de warning:

```text
Un item resolved deberia tener valor canonico.
```

Los warnings ayudan sin bloquear todo el flujo.

## Logs de Cambios

Cuando una pantalla admin modifica datos de revision, registrar:

* entidad
* row id o id canonico
* valor raw
* valores anteriores
* valores nuevos
* timestamp
* usuario si existe autenticacion

Este patron permite auditar cambios humanos y diagnosticar errores.

## Validaciones

Validar en varias capas:

* base de datos: constraints para integridad
* schemas: tipos y campos permitidos
* repositorio/servicio: reglas del dominio
* frontend: feedback rapido y UX

No confiar solo en el frontend.

## Checklist Para Anadir un CRUD

1. Definir entidad y relaciones.
2. Decidir si necesita raw, normalizacion o solo canonico.
3. Crear o actualizar tabla canonica.
4. Anadir constraints e indices necesarios.
5. Crear migracion o actualizar schema segun fase del proyecto.
6. Crear repositorio con listar, obtener, contar y mutaciones.
7. Crear schemas Pydantic.
8. Crear modulo de rutas.
9. Registrar router en `main.py`.
10. Crear tipos frontend.
11. Crear funciones API frontend.
12. Crear hooks.
13. Crear pagina de lista.
14. Crear pagina de detalle.
15. Crear componentes de item/formulario.
16. Anadir ruta frontend.
17. Anadir navegacion si aplica.
18. Anadir search si la entidad debe ser encontrable globalmente.
19. Anadir feedback contextual si los usuarios pueden reportar errores sobre la entidad.
20. Anadir quality checks si la entidad tiene relaciones o campos criticos.
21. Documentar endpoints o decisiones relevantes.

## Checklist Para Anadir Correcciones Admin

1. Definir archivo o tabla de revision.
2. Definir columnas editables.
3. Definir estados permitidos.
4. Crear repositorio con lista paginada, update y options.
5. Registrar log de cambios.
6. Crear schemas admin.
7. Crear rutas con dependencia admin.
8. Crear feature frontend admin.
9. Mostrar metricas.
10. Incluir filtros, busqueda y orden.
11. Incluir acciones rapidas.
12. Sincronizar artefactos derivados si existen.
