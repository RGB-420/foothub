---
comments: true
---

# Manual de Trabajo para Agentes de IA

Este documento esta dirigido a agentes de IA que trabajen sobre proyectos construidos con esta filosofia.

No es un prompt. Es una forma de pensar y operar antes, durante y despues de cada cambio.

## Objetivo del Agente

El agente debe mejorar el proyecto sin erosionar su arquitectura.

Su trabajo no es solo producir codigo que funcione. Debe mantener:

* coherencia entre capas
* claridad de dominio
* trazabilidad de datos
* contratos API/frontend
* documentacion viva
* facilidad de mantenimiento a largo plazo

## Antes de Implementar

El agente debe leer primero:

1. `engineering-docs/00-como-usar-este-manual.md`
2. `engineering-docs/11-blueprint-proyecto-nuevo.md`
3. el documento de la capa afectada
4. `engineering-docs/16-anti-patterns.md`
5. este documento

Si trabaja en un proyecto real, tambien debe leer la documentacion local del proyecto.

## Preguntas Iniciales

Antes de tocar archivos, responder mentalmente:

* Que dominio o entidad cambia?
* Es lectura publica, admin, pipeline, importacion o calidad de datos?
* Que capas deben cambiar?
* Existe ya un patron local?
* Hay componentes, hooks, repositorios o services reutilizables?
* El dato es raw, revision o canonico?
* La tarea introduce una decision arquitectonica?
* Hay que actualizar docs o ADRs?

## Regla de Ubicacion

Si una funcionalidad no tiene ubicacion clara, decidir asi:

* HTTP y validacion de request: API route.
* Persistencia: repository o adapter.
* Reglas de dominio: service.
* Secuencia operacional repetible: pipeline.
* UI de pagina: page.
* Estado de datos frontend: hook.
* Llamada HTTP frontend: feature api.
* UI reutilizable local: feature component.
* UI reutilizable transversal: shared component.

No crear una carpeta nueva si una existente expresa bien la responsabilidad.

## Reutilizacion

Reutilizar cuando:

* el componente o helper ya expresa el mismo concepto
* la API existente cubre el caso sin hacks
* el patron local es claro y estable

Crear algo nuevo cuando:

* el caso de uso tiene responsabilidad distinta
* reutilizar obligaria a props confusas
* el componente existente pertenece a otro dominio
* la abstraccion actual no cubre el nuevo flujo sin romper claridad

No forzar reutilizacion por evitar archivos.

## Mantener Arquitectura

El agente debe proteger estas fronteras:

* React nunca accede a DB.
* Routes no contienen SQL.
* Repositories no contienen UI ni HTTP.
* Services no conocen componentes frontend.
* Raw data no entra directo al canonico sin normalizacion.
* Admin no se mezcla con rutas publicas.
* Scripts repetidos se promueven a pipelines.

## Desarrollo por Capas

Para una feature end-to-end, avanzar asi:

1. Modelo de datos.
2. Repository.
3. Service si hace falta.
4. Schema.
5. Route.
6. Registro de route.
7. Tipo frontend.
8. API frontend.
9. Hook.
10. Componentes.
11. Pagina.
12. Ruta frontend.
13. Navegacion si aplica.
14. Docs.
15. Tests/verificacion.

No entregar una feature que solo existe en una capa si el objetivo era end-to-end.

## Como Revisar el Propio Cambio

Antes de finalizar, el agente debe comprobar:

* Los nombres son consistentes entre DB, API y frontend.
* Los schemas Pydantic coinciden con tipos TypeScript.
* Las rutas backend estan registradas.
* Las rutas frontend estan registradas.
* Las listas tienen loading, error y empty state.
* Las mutaciones tienen estado saving/error.
* Los endpoints admin estan protegidos.
* Los datos ambiguos van a revision.
* No hay SQL en routes.
* No hay fetch directo en paginas.
* La documentacion afectada esta actualizada.

## Deteccion de Inconsistencias

El agente debe sospechar inconsistencia cuando:

* una palabra de dominio cambia entre capas
* hay dos componentes casi iguales
* un endpoint no aparece en docs
* un schema tiene campos que el repositorio no devuelve
* un tipo frontend no coincide con la API
* una tabla no aparece en el modelo de datos
* un script se ejecuta como parte del flujo normal pero no es pipeline
* un CSV se usa como estado compartido por varias pantallas

Cuando detecte inconsistencia, debe corregirla o documentarla como deuda.

## Criterios Para Crear ADR

Crear o proponer ADR si:

* cambia la estrategia de persistencia
* se introduce una libreria central
* se cambia autenticacion
* se cambia estructura de carpetas
* se cambia raw/norm/canonico
* se cambia el flujo de pipelines
* se acepta una excepcion relevante

## Verificacion Final

El agente debe ejecutar las comprobaciones disponibles:

* tests del backend si existen
* lint/build frontend si aplica
* validacion de docs si se tocaron docs
* comandos especificos de la feature si existen

Si no puede ejecutar una comprobacion, debe decirlo explicitamente y explicar por que.

## Forma de Entregar

El cierre debe incluir:

* que cambio
* en que archivos
* como se verifico
* que no se pudo verificar
* riesgos o siguientes pasos reales

No ocultar incertidumbre. No declarar completado algo que no se verifico.

## Principio Final

El agente debe dejar el proyecto mas facil de entender que antes.

Si una solucion funciona pero hace mas dificil saber donde vive cada cosa, todavia no es una buena solucion.

