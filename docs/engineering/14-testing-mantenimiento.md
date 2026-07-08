---
comments: true
---

# Testing y Mantenimiento

El proyecto original no tiene una suite de tests amplia. Para proyectos futuros, esta es una mejora obligatoria si la aplicacion va a mantenerse durante anos.

## Objetivo

Los tests deben proteger:

* reglas de dominio
* normalizacion de datos
* repositorios criticos
* contratos API
* flujos admin
* build frontend
* pipelines idempotentes

No se busca cobertura por cubrir. Se busca confianza en los cambios.

## Piramide Recomendada

1. Tests unitarios para normalizadores y utilidades.
2. Tests de repositorios con DB de test o fixtures.
3. Tests API para rutas principales.
4. Tests frontend para componentes con logica.
5. Smoke tests de build y arranque.
6. Tests end-to-end solo para flujos criticos.

## Backend

Minimo:

* normalizadores con inputs raros
* servicios de mapping
* repositorios de upsert
* endpoints de lista/detalle
* endpoints admin con y sin autorizacion

Para repositorios, comprobar:

* inserta una vez
* repetir no duplica
* actualiza campos permitidos
* relaciones no se duplican
* `count` coincide con lista

## Frontend

Minimo:

* `npm run lint`
* `npm run build`
* tests de hooks o componentes donde haya transformacion
* prueba manual documentada de rutas principales

Si se usa TanStack Query, testear wrappers/hook de feature solo cuando contengan logica propia.

## Pipelines

Cada pipeline importante debe tener:

* entrada pequena de ejemplo
* salida esperada
* prueba de idempotencia
* prueba de datos ambiguos
* logs suficientes para diagnostico

Un pipeline que crea datos canonicos desde raw debe poder repetirse sin duplicar entidades.

## Calidad de Datos

Mantener dashboards o reportes de:

* registros totales
* relaciones faltantes
* alias pendientes
* issues por tipo
* nuevas entidades por periodo
* fallos de ingestion

La calidad debe ser observable, no una sensacion.

## Mantenimiento de Docs

Actualizar docs cuando:

* se anade una entidad central
* se anade un modulo transversal
* cambia el flujo de datos
* cambia autenticacion o permisos
* cambia estructura de carpetas
* cambia una regla de naming
* se acepta deuda tecnica

Crear ADR cuando el cambio afecte a varios modulos o futuros proyectos.

## Revisiones Periodicas

Cada cierto tiempo revisar:

* dependencias obsoletas
* migraciones pendientes
* tablas sin uso
* scripts que deberian ser pipelines
* CSVs que deberian estar en DB
* componentes duplicados
* endpoints sin documentar
* reglas que solo viven en codigo

## Deuda Tecnica Aceptable

La deuda tecnica es aceptable si:

* esta nombrada
* tiene razon
* tiene alcance
* tiene plan de salida

No aceptar deuda silenciosa en:

* integridad de datos
* seguridad admin
* migraciones productivas
* perdida de raw data
* contratos API/frontend

