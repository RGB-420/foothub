---
comments: true
---

# Prueba de Repositorio Vacio

Usar esta prueba antes de entregar el manual a un equipo o a otro Codex.

La pregunta es: si solo existieran `docs/` y un repositorio vacio, se podria construir una aplicacion nueva sin mirar el proyecto original?

## Resultado Esperado

La respuesta debe ser si para todos los bloques siguientes.

Si alguna respuesta es no, actualizar el documento que corresponda antes de empezar a programar.

## Dudas Criticas y Donde Se Resuelven

| Duda | Documento que la resuelve |
| --- | --- |
| Que documentos tienen prioridad? | `00-como-usar-este-manual.md` |
| Que parte es reutilizable y que parte es del proyecto original? | `docs/index.md` y `00-como-usar-este-manual.md` |
| Como arranco desde un repo vacio? | `11-blueprint-proyecto-nuevo.md` |
| Que carpetas debo crear? | `02-estructura-proyecto.md` y `11-blueprint-proyecto-nuevo.md` |
| Como nombro archivos, rutas, tablas y hooks? | `13-convenciones-nombres.md` |
| Como diseno una entidad nueva? | `06-cruds-admin.md` |
| Como creo un CRUD completo? | `06-cruds-admin.md` |
| Como separo raw, revision y canonico? | `01-filosofia-arquitectura.md` y `04-base-datos.md` |
| Donde vive la logica de negocio? | `03-backend-api.md` |
| Donde vive la persistencia? | `03-backend-api.md` |
| Como organizo el frontend? | `05-frontend.md` |
| Como creo search, feedback, admin o quality? | `12-modulos-estandar.md` |
| Cuando uso scripts y cuando pipelines? | `07-pipelines-scripts.md` |
| Como configuro entorno y Docker? | `08-configuracion-docker.md` |
| Como pruebo y mantengo el sistema? | `14-testing-mantenimiento.md` |
| Que errores debo evitar? | `16-anti-patterns.md` |
| Hay ejemplos pequenos de referencia? | `examples/index.md` |
| Como debe trabajar un agente de IA? | `17-manual-agentes-ia.md` |
| Como preparo un prompt o handoff para Codex? | `09-ai-handoff.md` |
| Que mejoras son target para proyectos nuevos? | `10-mejoras-recomendadas.md` |

## Checklist de Construccion Mental

Un Codex deberia poder ejecutar mentalmente este flujo:

1. Leer `00-como-usar-este-manual.md`.
2. Leer `11-blueprint-proyecto-nuevo.md`.
3. Definir dominio y entidades.
4. Crear estructura base.
5. Crear docs minimas y ADRs iniciales.
6. Configurar backend.
7. Configurar DB.
8. Configurar frontend shell.
9. Crear primera entidad end-to-end.
10. Anadir admin si el producto lo necesita.
11. Anadir search, feedback o quality solo si aportan valor.
12. Anadir pipelines solo si hay flujo repetible.
13. Crear tests minimos.
14. Revisar anti patterns.
15. Consultar ejemplos de referencia si hay dudas de estructura.
16. Verificar que las decisiones nuevas quedan documentadas.

## Preguntas de Aceptacion

Antes de empezar un nuevo proyecto, responder:

* Se que archivo debo crear primero?
* Se que decisiones son obligatorias?
* Se que decisiones son recomendadas pero sustituibles por ADR?
* Se como nombrar una tabla, una ruta, un schema y un hook?
* Se como exponer una lista paginada?
* Se como exponer un detalle?
* Se como anadir relaciones?
* Se como crear un formulario admin?
* Se como proteger rutas admin?
* Se como manejar datos ambiguos?
* Se cuando usar CSV y cuando DB?
* Se como convertir un script en pipeline?
* Se como actualizar docs cuando cambie una decision?

Si una respuesta es ambigua, no empezar a programar.

## Regla Final

El manual es suficientemente solido cuando la implementacion de una primera entidad no requiere inventar estructura.

El desarrollador debe poder concentrarse en el dominio, no en decidir donde vive cada pieza.
