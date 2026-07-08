---
comments: true
---

# Convenciones para IA y Traspaso

## Objetivo

Este proyecto esta organizado de forma muy adecuada para trabajo asistido por IA porque las capas son explicitas y los patrones se repiten.

Un Codex futuro debe poder anadir funcionalidad siguiendo rutas conocidas, sin inventar arquitectura nueva cada vez.

Para instrucciones operativas detalladas dirigidas exclusivamente a agentes, leer tambien `17-manual-agentes-ia.md`.

## Prompt Base para un Proyecto Nuevo

Usar este texto como arranque:

```text
Construye esta aplicacion siguiendo el manual de ingenieria en engineering-docs/.

Primero lee 00-como-usar-este-manual.md y 11-blueprint-proyecto-nuevo.md.

Respeta estos principios:
- arquitectura database-first
- backend FastAPI por rutas, schemas, repositorios y servicios
- frontend React/Vite por features
- datos raw, normalizacion y canonico separados cuando haya imports o datos ambiguos
- rutas finas y SQL en repositorios
- CRUDs repetibles de extremo a extremo
- documentar decisiones importantes con ADRs
- no introducir abstracciones grandes sin repeticion real
```

## Como Pedir una Feature a IA

Dar siempre:

* entidad o dominio
* campos principales
* relaciones
* pantallas esperadas
* si requiere admin
* si requiere importacion o normalizacion
* reglas de validacion

Formato recomendado:

```text
Anade la entidad Players.

Campos:
- name
- birth_date
- position
- id_club

Relaciones:
- un player pertenece a un club
- un player puede estar en varios teams por temporada

Pantallas:
- lista publica
- detalle publico
- CRUD admin

Sigue engineering-docs/06-cruds-admin.md.
```

## Reglas para Codex

Codex debe:

* leer docs antes de cambiar arquitectura
* respetar la jerarquia de autoridad de 00-como-usar-este-manual.md
* comprobar patrones existentes antes de crear nuevos
* tocar todas las capas necesarias de un CRUD
* mantener rutas finas
* mantener repositorios explicitos
* crear schemas de frontera
* actualizar tipos frontend
* mantener nombres de dominio consistentes
* anadir o actualizar docs si cambia una decision

Codex no debe:

* saltarse la base de datos desde frontend
* meter SQL en componentes frontend o rutas React
* mezclar raw y canonico sin decision explicita
* convertir scripts puntuales en arquitectura implicita
* borrar cambios no relacionados
* introducir librerias nuevas sin justificar

## Contexto Que Debe Existir

Cada proyecto deberia tener:

```text
docs/ai-context/ai-development-context.md
```

Ese documento debe incluir:

* resumen del proyecto
* stack actual
* estructura de carpetas
* arquitectura de base de datos
* convenciones API
* convenciones frontend
* restricciones aceptadas
* comandos habituales
* riesgos conocidos

## ADRs

Las ADRs son instrucciones para el futuro.

Crear ADR cuando:

* se elige una arquitectura
* se cambia el sistema de persistencia
* se introduce una tecnologia central
* se modifica una convencion transversal
* se acepta una deuda tecnica deliberada
* se decide separar o unir capas

Formato:

```text
Contexto
Decision
Consecuencias
```

## Checklist de Handoff

Antes de entregar una feature construida por IA:

1. Confirmar que backend y frontend usan los mismos nombres.
2. Confirmar que schemas Pydantic y tipos TypeScript coinciden.
3. Confirmar que rutas estan registradas.
4. Confirmar que las listas tienen loading, error y empty state.
5. Confirmar que formularios tienen validacion minima.
6. Confirmar que endpoints admin usan dependencia admin.
7. Confirmar que datos ambiguos van a revision.
8. Confirmar que docs o ADRs se actualizaron si hubo decision nueva.
9. Ejecutar tests, lint o build disponibles.
10. Resumir cambios por capa.

## Estilo de Implementacion

Preferir:

* cambios pequenos y coherentes
* nombres obvios
* funciones con una responsabilidad
* componentes de dominio antes que mega componentes
* SQL legible
* validacion clara

Evitar:

* abstracciones globales prematuras
* generadores opacos
* magia de convenciones no documentadas
* dependencias innecesarias
* cambios cosmeticos mezclados con funcionalidad
