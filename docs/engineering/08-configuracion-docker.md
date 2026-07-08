---
comments: true
---

# Configuracion, Docker y Despliegue

## Configuracion

Centralizar configuracion en `app/core/config.py` o equivalente.

Responsabilidades:

* resolver raiz del proyecto
* leer paths desde variables de entorno
* definir subcarpetas operativas
* crear directorios necesarios
* exponer constantes compartidas

Variables tipicas:

```text
DB_USER
DB_PASSWORD
DB_HOST
DB_PORT
DB_NAME
ADMIN_KEY
PROJECT_DOCS_URL
DATA_PATH
LOG_PATH
VITE_API_URL
```

Mantener `.env.example` actualizado.

## Secretos

Reglas:

* nunca versionar `.env`
* incluir `.env.example` sin valores reales
* validar secretos obligatorios al arrancar
* fallar pronto si faltan credenciales criticas
* separar configuracion local, staging y produccion

## Docker

En el proyecto analizado no hay Docker activo, pero para futuros proyectos conviene incluirlo desde el inicio.

Estructura recomendada:

```text
infrastructure/
  docker/
    backend.Dockerfile
    frontend.Dockerfile
docker-compose.yml
```

Servicios minimos:

* `db`: PostgreSQL
* `backend`: FastAPI/Uvicorn
* `frontend`: Vite dev server o build servido por nginx
* opcional `docs`: MkDocs/Zensical

## Compose Local

El entorno local deberia permitir:

```bash
docker compose up
```

Y dejar disponibles:

* API
* frontend
* base de datos
* volumen persistente de PostgreSQL

Variables locales en `.env` o `.env.docker`.

## Backend Runtime

Comando recomendado:

```bash
uvicorn app.api.main:app --host 0.0.0.0 --port 8000 --reload
```

En produccion:

* sin `--reload`
* workers segun entorno
* CORS restringido
* logs estructurados si hay observabilidad

## Frontend Runtime

Durante desarrollo:

```bash
npm run dev
```

Build:

```bash
npm run build
```

`VITE_API_URL` debe apuntar al backend correcto.

## Documentacion

El proyecto usa MkDocs/Zensical. Mantener docs como parte del flujo:

* nav declarada
* ADRs versionadas
* manual para IA
* build local reproducible

Para futuros proyectos, documentar como construir docs:

```bash
mkdocs serve
mkdocs build
```

o el comando equivalente si se usa Zensical.

Si se generan PDF o ZIP:

* documentar que archivos son fuente y cuales son artefactos
* no editar artefactos generados a mano
* mantener el script de build en `docs/` o `scripts/`

## CORS

El proyecto actual permite origenes amplios. Para futuros proyectos:

* permitir `*` solo en desarrollo local
* restringir origenes en produccion
* documentar variables de entorno de origenes permitidos

## Checklist de Nuevo Proyecto

1. Crear `.env.example`.
2. Crear configuracion central.
3. Crear Dockerfile backend.
4. Crear Dockerfile frontend si aplica.
5. Crear `docker-compose.yml` con PostgreSQL.
6. Definir volumen de datos.
7. Definir comandos de dev.
8. Definir comandos de build.
9. Documentar puertos.
10. Validar CORS por entorno.
11. Documentar inicializacion de DB.
12. Verificar que un nuevo desarrollador puede arrancar todo desde cero.
