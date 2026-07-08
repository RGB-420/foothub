---
comments: true
---

# Mejoras Recomendadas para el Siguiente Proyecto

Estas mejoras no son criticas para entender el proyecto original. Para proyectos nuevos son el target recomendado, salvo ADR que justifique otra decision.

## 1. Migraciones Desde el Inicio

El uso de `schema.sql` es claro y comodo en fases tempranas. Para el siguiente proyecto, anadir migraciones versionadas desde el principio.

Opcion recomendada:

* Alembic si se mantiene SQLAlchemy
* migraciones SQL manuales si se quiere maxima transparencia

Beneficio:

* cambios de schema auditables
* despliegues mas seguros
* onboarding mas facil

## 2. TanStack Query Como Patron Estandar

El frontend tiene TanStack Query instalado, pero muchos hooks gestionan `loading/error/data` manualmente.

Para nuevos proyectos:

* usar TanStack Query para lecturas
* usar mutations para writes
* invalidar queries tras cambios admin
* mantener hooks por feature como fachada

Beneficio:

* menos codigo repetido
* cache consistente
* mejor UX en recargas y mutaciones

## 3. Cliente API Mas Rico

El cliente API actual es intencionadamente simple.

Mejoras:

* parsear errores del backend
* incluir status code
* soportar respuestas vacias
* helper para auth/admin headers
* timeout o abort controller

Beneficio:

* errores mas utiles
* menos duplicacion en llamadas admin
* mejor diagnostico en frontend

## 4. Contratos Compartidos o Generados

Actualmente Pydantic y TypeScript se mantienen en paralelo.

Para proyectos mas grandes:

* generar OpenAPI desde FastAPI
* generar cliente TypeScript
* o documentar una rutina de sincronizacion manual estricta

Beneficio:

* menos drift entre backend y frontend
* cambios de API detectables antes

## 5. Autenticacion Real para Admin

El patron `x-admin-key` es util para herramienta interna temprana.

Para futuros proyectos con usuarios:

* login real
* roles
* permisos por accion
* auditoria por usuario

Beneficio:

* seguridad
* trazabilidad
* preparacion para uso multiusuario

## 6. Docker Compose Local

No hay Docker activo en el proyecto analizado.

Para el siguiente proyecto:

* PostgreSQL en compose
* backend en container
* frontend en container opcional
* volumen persistente
* comando unico de arranque

Beneficio:

* onboarding rapido
* menos diferencias entre maquinas
* mejor base para despliegue

## 7. Tests Minimos por Capa

No se observa una suite de tests estructurada.

Minimo recomendado:

* repositorios criticos con DB de test o fixtures
* servicios de normalizacion con casos de borde
* API smoke tests
* frontend build/lint
* tests de componentes solo donde haya logica real

Beneficio:

* confianza al refactorizar
* proteccion contra regresiones en datos
* trabajo con IA mas seguro

## 8. Validacion de Configuracion

La configuracion se lee desde entorno y paths centralizados.

Mejora:

* usar Pydantic Settings o validador equivalente
* validar variables obligatorias por entorno
* fallar al arrancar con mensajes claros

Beneficio:

* menos errores silenciosos
* despliegues mas previsibles

## 9. Estandarizar Nombres de IDs

El proyecto usa nombres como `id_club`, `club_id`, `id_boat` segun capa.

Para el siguiente proyecto elegir una convencion y documentarla:

* base de datos: `id_club`
* API params: `club_id`
* frontend: `id_club` si refleja backend

O, alternativamente:

* base de datos y API: `club_id`

Lo importante es que la conversion sea consciente.

## 10. Separar Servicios de Archivo y DB

Algunas rutas admin trabajan con CSVs de revision. Es valido, pero conviene aislarlo.

Mejora:

* crear servicios de storage para archivos de revision
* mover paths y columnas a modulos bien nombrados
* preparar migracion posterior a tablas

Beneficio:

* menos acoplamiento a pandas en repositorios admin
* evolucion mas facil hacia DB completa

## 11. Politica de CORS por Entorno

El CORS amplio acelera desarrollo.

Para futuros proyectos:

* `allow_origins=["*"]` solo local
* lista de origenes por variable de entorno
* configuracion separada por entorno

Beneficio:

* produccion mas segura

## 12. Plantilla de Feature

Crear una plantilla documentada para nuevas entidades:

```text
backend:
- schema
- repository
- route
- router registration

frontend:
- types
- api calls
- hooks
- list page
- detail page
- item component

docs:
- API note
- ADR si cambia arquitectura
```

Beneficio:

* menos decisiones repetidas
* trabajo mas rapido con Codex
* mayor consistencia
