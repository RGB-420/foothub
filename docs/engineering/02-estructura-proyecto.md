---
comments: true
---

# Estructura de Proyecto

## Estructura Base Recomendada

Usar una raiz de proyecto que separe backend, frontend, base de datos, datos operativos, documentacion e infraestructura.

```text
project-root/
  app/
    api/
    core/
    models/
    repositories/
    schemas/
    services/
  db/
  frontend/
  data/
  logs/
  pipelines/
  scripts/
  infrastructure/
  docs/
  requirements.txt
  .env.example
```

No todos los proyectos necesitan todas las carpetas desde el dia uno, pero esta estructura permite crecer sin mover piezas fundamentales.

## Backend: `app/`

`app/` contiene el backend de aplicacion. Debe ser el lugar donde viven API, schemas, servicios y acceso a datos.

Responsabilidades:

* `app/api/`: entrada HTTP, rutas y dependencias
* `app/core/`: configuracion, helpers compartidos, utilidades base
* `app/models/`: modelos ORM cuando aportan valor
* `app/repositories/`: consultas SQL y operaciones de persistencia
* `app/schemas/`: contratos Pydantic de entrada y salida
* `app/services/`: logica de dominio, normalizacion, agregacion, sync, exportaciones, email

Regla: una ruta no debe convertirse en un servicio escondido. Si empieza a contener transformaciones, reglas de negocio o acceso complejo a datos, moverlo a `repositories/` o `services/`.

## Base de Datos: `db/`

`db/` contiene conexion, inicializacion y schema.

Estructura recomendada:

```text
db/
  connection.py
  session.py
  schema.sql
  init_db.py
  migrations/
```

El proyecto actual usa `schema.sql` como declaracion principal. Para futuros proyectos conviene mantener ese punto de verdad al principio y anadir migraciones cuando el schema cambie con frecuencia o haya despliegues compartidos.

## Frontend: `frontend/`

El frontend se organiza como aplicacion independiente Vite/React/TypeScript.

Estructura recomendada:

```text
frontend/src/
  app/
    App.tsx
    layout.tsx
    routes.tsx
  shared/
    api/
    components/
    config/
    hooks/
  features/
    <domain>/
      api/
      components/
      hooks/
      pages/
      types.ts
```

Cada dominio vive en `features/<domain>`. `shared` solo debe contener piezas genuinamente transversales.

## Datos Operativos: `data/`

`data/` se usa para artefactos que ayudan a operar el sistema:

* raw exports
* master files
* mapping files
* review queues
* reports
* debug outputs
* scrape/import queues

Convencion recomendada:

```text
data/
  raw/
  master/
  mapping/
  review/
  queue/
  report/
  debug/
```

Los datos operativos no deben sustituir silenciosamente a la base de datos. Si un archivo se convierte en fuente duradera del producto, hay que decidir explicitamente si debe pasar a tabla.

## Pipelines y Scripts

Usar dos carpetas distintas:

* `pipelines/`: flujos de negocio repetibles, compuestos por pasos
* `scripts/`: utilidades manuales, informes, reparaciones, comandos operativos

Un pipeline debe poder ejecutarse por nombre desde una CLI central.

Un script puede ser mas puntual, pero debe tener nombre descriptivo y no esconder cambios destructivos.

## Documentacion: `docs/`

La documentacion debe estar versionada junto al proyecto.

Estructura recomendada:

```text
docs/
  index.md
  project/
  architecture/
  api/
  decisions/
  ai-context/

engineering-docs/
```

Separar:

* documentacion del producto actual
* decisiones arquitectonicas
* manual reutilizable para proyectos futuros
* contexto para IA

## Infraestructura

`infrastructure/` debe contener archivos que describen o alimentan el entorno:

* Docker
* compose
* configuracion externa
* ejemplos de imports
* certificados locales no secretos
* plantillas

En el proyecto analizado no hay `Dockerfile` ni `docker-compose` activos. Para futuros proyectos se recomienda incluirlos desde el inicio, aunque sean minimos.

## Convenciones de Nombre

Usar nombres orientados al dominio:

* carpetas frontend en plural cuando representan colecciones: `clubs`, `boats`, `regattas`
* rutas API en plural: `/clubs`, `/boats`
* schemas en singular para entidad y prefijos claros para variantes: `Club`, `ClubDetail`, `PaginatedClubs`
* repositorios con sufijo `_repo.py`
* pipelines con sufijo `_pipeline.py`
* hooks frontend con prefijo `use`
* llamadas API frontend con verbo claro: `getClubById`, `updateClubCorrection`

La consistencia importa mas que el gusto exacto.
