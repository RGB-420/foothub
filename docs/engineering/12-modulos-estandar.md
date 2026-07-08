---
comments: true
---

# Modulos Estandar

Estos modulos aparecen en el proyecto original como capacidades transversales. No todos los productos los necesitan, pero si se incluyen deben seguir estos patrones.

## Search

Usar search cuando el producto tenga varias entidades navegables.

Patron backend:

```text
GET /search?q=<query>
```

Respuesta recomendada:

```json
{
  "clubs": [],
  "players": [],
  "teams": []
}
```

Cada item debe incluir:

```text
id
name
type
```

Reglas:

* minimo de caracteres para buscar
* limite por entidad
* orden estable
* whitelist de tablas o repositorios buscables
* nunca construir SQL dinamico desde inputs no controlados

Patron frontend:

* `features/search/types.ts`
* `features/search/api/getSearch.ts`
* `features/search/hooks/useSearch.ts`
* componente input con debounce
* dropdown agrupado por entidad

## Feedback In-App

Usar feedback cuando los usuarios puedan reportar errores de datos o sugerir nuevos elementos.

Patron backend:

```text
POST /feedback
GET /feedback            admin
PATCH /feedback/{id}     admin
```

Campos recomendados:

* entity_type
* entity_id
* type
* message
* page
* link
* status
* created_at

Estados recomendados:

* `pending`
* `reviewed`
* `fixed`
* `ignored`

Patron frontend:

* boton contextual en paginas de detalle
* modal de feedback
* toast de exito/error
* bandeja admin de revision

Si el feedback dispara email, hacerlo en background task o cola. No bloquear la respuesta HTTP por envio de email.

## Admin Shell

Admin debe ser un area separada:

```text
/admin
/admin/<module>
/admin/corrections/<domain>
/admin/quality
```

Frontend:

* feature `admin`
* entrada controlada
* rutas explicitamente admin
* logout o limpieza de credenciales
* links a modulos admin

Backend:

* dependencia de autorizacion por router
* tags admin separados
* schemas admin separados

El proyecto original usa `x-admin-key` y `localStorage`. Para proyectos nuevos eso solo es aceptable en herramientas privadas tempranas. Si hay usuarios reales, usar autenticacion real.

## Correcciones

Usar correcciones cuando hay valores ambiguos o pendientes de normalizacion.

Patron:

```text
GET /admin/corrections/<domain>
PATCH /admin/corrections/<domain>/{row_id}
GET /admin/corrections/<domain>/options
```

La respuesta debe incluir:

* data
* total
* limit
* offset
* metrics

El frontend debe incluir:

* filtros
* busqueda
* orden
* metricas
* tarjetas o filas editables
* warnings
* acciones rapidas de estado

## Calidad de Datos

Usar quality cuando el producto dependa de datos completos o relaciones consistentes.

Patron backend:

```text
GET /admin/quality/<entity>
GET /admin/quality/<entity>/issues
GET /admin/quality/<entity>/issues/{issue_key}
```

Metricas recomendadas:

* total
* coverage por campo o relacion
* missing
* porcentaje
* issues agrupados
* muestras limitadas
* detalle paginado por issue

Reglas:

* las metricas deben ser explicables en SQL o servicios simples
* cada issue debe tener key estable
* los samples deben enlazar a entidades reales cuando sea posible

## Colas Operativas

Usar colas cuando un humano decide que elementos entran en un pipeline.

Ejemplos:

* imports pendientes
* fuentes pendientes
* elementos por revisar
* tareas de enriquecimiento

Pueden empezar en CSV si el flujo es interno y temprano. Deben pasar a DB si:

* hay varios usuarios
* hay concurrencia
* se necesita auditoria fuerte
* se convierten en parte central del producto

## Documentacion Generada

Si el proyecto usa sitio de docs:

* `docs/` es fuente
* `site/` es artefacto generado
* `docs/download/` puede contener exports generados
* documentar el comando de build

No mezclar documentacion fuente y artefactos sin convencion clara.

