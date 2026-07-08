---
comments: true
---

# Blueprint de Proyecto Nuevo

Este documento permite crear una aplicacion nueva desde un repositorio vacio siguiendo la filosofia del manual.

## 1. Definir el Dominio

Antes de crear archivos, escribir una ficha corta:

```text
Nombre del proyecto:
Problema que resuelve:
Usuarios principales:
Entidades canonicas:
Relaciones principales:
Datos externos o imports:
Necesita admin:
Necesita revision humana:
Necesita pipelines:
```

Ejemplo para un CRM de clubes de futbol:

```text
Entidades canonicas:
- clubs
- teams
- players
- coaches
- seasons
- matches
- facilities
- contacts

Datos externos:
- imports CSV de jugadores
- registros manuales de clubes

Revision humana:
- duplicados de jugadores
- alias de clubes
```

## 2. Crear Estructura Inicial

Crear esta estructura minima:

```text
project-root/
  app/
    api/
      dependencies/
      routes/
      main.py
    core/
      config.py
      db.py
    repositories/
    schemas/
    services/
  db/
    connection.py
    schema.sql
    migrations/
  frontend/
    src/
      app/
      shared/
      features/
  data/
    raw/
    master/
    mapping/
    review/
    queue/
    report/
    debug/
  logs/
  pipelines/
    common/
  scripts/
  infrastructure/
  docs/
    decisions/
    ai-context/
  engineering-docs/
  .env.example
  requirements.txt
```

Si el proyecto no tiene pipelines al inicio, mantener `pipelines/` vacio o no crearlo hasta que exista un flujo repetible.

## 3. Crear Documentacion Minima

Antes de programar features, crear:

```text
docs/index.md
docs/project/overview.md
docs/architecture/system-overview.md
docs/architecture/data-model.md
docs/api/overview.md
docs/decisions/index.md
docs/ai-context/ai-development-context.md
```

Crear tambien las primeras ADRs:

* base de datos elegida
* estructura backend/frontend
* estrategia de datos raw/revision/canonico si aplica
* estrategia de autenticacion si hay admin

## 4. Configurar Backend

Backend minimo:

* FastAPI app en `app/api/main.py`
* conexion DB en `db/connection.py`
* sesion por request en `app/api/dependencies/database.py`
* configuracion central en `app/core/config.py`
* helper de filas en `app/core/db.py`
* primer health/project endpoint

`main.py` debe registrar routers, CORS y metadata. No debe contener reglas de negocio.

## 5. Configurar Base de Datos

Definir schemas desde el inicio:

```text
<app>_db
<app>_raw
<app>_norm
```

Si no hay datos externos ni normalizacion, crear solo `<app>_db` y documentar que raw/norm se anadiran cuando sean necesarios.

Para proyectos nuevos, usar migraciones versionadas aunque exista `schema.sql`.

## 6. Configurar Frontend

Frontend minimo:

```text
frontend/src/app/App.tsx
frontend/src/app/layout.tsx
frontend/src/app/routes.tsx
frontend/src/shared/api/client.ts
frontend/src/shared/config/navigation.ts
frontend/src/shared/components/Navbar.tsx
frontend/src/shared/components/ThemeToggle.tsx
frontend/src/features/home/pages/HomePage.tsx
```

La aplicacion debe arrancar con:

```text
BrowserRouter
  -> Layout
  -> Navbar
  -> Routes
```

La navegacion principal debe vivir como datos en `shared/config/navigation.ts`.

## 7. Crear la Primera Entidad

Para cada entidad canonica:

1. Tabla en DB.
2. Repositorio.
3. Schemas Pydantic.
4. Rutas API.
5. Registro del router.
6. Tipos TypeScript.
7. Funciones API frontend.
8. Hooks.
9. Pagina lista.
10. Pagina detalle.
11. Item component.
12. Link en navegacion si aplica.
13. Docs API y modelo de datos.

No crear pantallas antes de tener claro el contrato API.

## 8. Crear Admin Solo Si Existe Workflow

Admin no es un lugar para meter todo lo incomodo.

Crear admin cuando haya:

* correcciones humanas
* colas operativas
* calidad de datos
* configuracion interna
* revision de feedback

Cada modulo admin debe tener permisos, ruta propia y schema propio.

## 9. Crear Pipelines Solo Si Hay Flujo Repetible

No crear pipeline para una accion de una sola vez.

Promover a pipeline cuando:

* se ejecuta periodicamente
* transforma datos en varias etapas
* debe ser idempotente
* genera canonico desde raw/revision

## 10. Primer Checklist de Calidad

Antes de considerar el proyecto base listo:

* backend arranca
* frontend arranca
* DB se inicializa desde cero
* docs se construyen
* `.env.example` esta completo
* una entidad atraviesa todo el stack
* existe al menos una ADR real
* Codex puede leer `docs/ai-context` y entender como contribuir
