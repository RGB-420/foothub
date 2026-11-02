---
comments: true
---

# Manual de Ingenieria para Proyectos Futuros

Este manual captura la filosofia tecnica extraida de este proyecto para poder reutilizarla en aplicaciones nuevas.

No documenta la aplicacion de regatas como producto. Documenta una manera de construir: como separar capas, como modelar entidades, como exponer APIs, como organizar el frontend, como disenar CRUDs y como dejar espacio para datos imperfectos, revision humana y crecimiento incremental.

Este manual es la fuente de verdad para proyectos futuros. El proyecto original es evidencia historica, no una obligacion de copiar cada detalle.

## Proposito

Notas del portfolio actual: [W1](w1-visual-foundation.md), [W2](w2-homepage-architecture.md), [W3 y publicación manual](w3-portfolio-architecture.md).

El objetivo es que un desarrollador o un Codex futuro pueda recibir este manual junto a una idea nueva, por ejemplo un CRM para clubes de futbol, y construir la aplicacion siguiendo la misma forma de trabajo.

El estilo resultante debe ser:

* explicito antes que magico
* modular antes que monolitico
* orientado a entidades duraderas
* conservador con los datos
* facil de revisar por humanos
* preparado para crecer por dominios
* comodo para desarrollo asistido por IA

## Lectura Recomendada

Para iniciar un proyecto nuevo, leer en este orden:

1. [Como usar este manual](00-como-usar-este-manual.md)
2. [Filosofia de arquitectura](01-filosofia-arquitectura.md)
3. [Blueprint de proyecto nuevo](11-blueprint-proyecto-nuevo.md)
4. [Estructura de proyecto](02-estructura-proyecto.md)
5. [Convenciones de nombres](13-convenciones-nombres.md)
6. [Backend y API](03-backend-api.md)
7. [Base de datos y modelo de datos](04-base-datos.md)
8. [Frontend](05-frontend.md)
9. [CRUDs y pantallas de administracion](06-cruds-admin.md)
10. [Modulos estandar](12-modulos-estandar.md)
11. [Pipelines, scripts y datos operativos](07-pipelines-scripts.md)
12. [Configuracion, Docker y despliegue](08-configuracion-docker.md)
13. [Testing y mantenimiento](14-testing-mantenimiento.md)
14. [Prueba de repositorio vacio](15-prueba-repositorio-vacio.md)
15. [Anti patterns](16-anti-patterns.md)
16. [Manual para agentes de IA](17-manual-agentes-ia.md)
17. [Ejemplos de referencia](examples/index.md)
18. [Convenciones para IA y traspaso](09-ai-handoff.md)
19. [Mejoras recomendadas para el siguiente proyecto](10-mejoras-recomendadas.md)

## Principios Resumidos

**La base de datos es el punto de integracion.**  
Los datos duraderos viven en PostgreSQL. Los ficheros existen para importaciones, revisiones, colas, informes y artefactos operativos, no como sustituto indefinido del modelo persistente.

**El dominio manda sobre la tecnologia.**  
Cada modulo se organiza alrededor de entidades y casos de uso reconocibles. El backend, el frontend, los repositorios, los schemas y las pantallas repiten nombres de dominio.

**Las rutas son finas.**  
La API valida, inyecta dependencias, llama a repositorios o servicios y devuelve objetos con forma de schema. La logica pesada vive fuera de los handlers.

**Los datos inciertos no se fuerzan.**  
Cuando una fuente externa, una importacion o un usuario generan valores ambiguos, el sistema crea estados pendientes, archivos de revision o tablas de normalizacion.

**El frontend esta partido por features.**  
Cada dominio agrupa sus tipos, llamadas API, hooks, componentes y paginas. Lo transversal vive en `shared`.

**La aplicacion crece por capas repetibles.**  
Para anadir una entidad se toca, de forma predecible, base de datos, repositorio, schema, ruta, cliente API, hook, pagina y componente.

**Las decisiones importantes se escriben.**  
Las ADRs y la documentacion de contexto para IA convierten decisiones tacitas en restricciones explicitas.

## Limites del Manual

El manual no intenta imponer que todos los productos tengan scraping, pipelines, admin o calidad de datos. Impone como deben organizarse esas capacidades cuando existan.

Si un proyecto futuro no necesita una capa, se omite explicitamente. No se deja a medias.

## Current portfolio presentation

[W4.1 — Visual case-study presentation](w4-1-case-study-presentation.md) documents ordered sections, evidence presentation, manual publication safeguards and isolated verification. Public case studies demonstrate the analyst's work; complete reports stay private.

Portfolio media: [W4.2 audiovisual evidence and resilience](w4-2-audiovisual-evidence.md).
