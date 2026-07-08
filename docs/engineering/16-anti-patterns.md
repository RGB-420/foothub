---
comments: true
---

# Anti Patterns

Este documento define formas de trabajar que degradan la arquitectura con el tiempo.

Cada anti pattern incluye el problema y la alternativa correcta.

## 1. Rutas API con SQL Dentro

**Problema:** mezcla HTTP, persistencia y reglas de datos. Hace dificil testear, reutilizar y cambiar consultas.

**Alternativa:** rutas finas que llaman repositorios o services.

## 2. Frontend Llamando a la Base de Datos

**Problema:** rompe la frontera de seguridad y acopla UI a almacenamiento.

**Alternativa:** React siempre consume FastAPI mediante la capa `features/<domain>/api`.

## 3. Componentes React con Lógica de Dominio Pesada

**Problema:** el componente deja de ser presentacional, se duplica logica y se vuelve dificil de probar.

**Alternativa:** mover transformaciones a hooks, services frontend o backend segun corresponda.

## 4. Crear Componentes Compartidos Demasiado Pronto

**Problema:** una abstraccion prematura fuerza casos de uso distintos a encajar en una API artificial.

**Alternativa:** duplicar localmente una o dos veces; extraer a `shared` cuando el patron sea estable.

## 5. Copiar y Pegar Features Sin Revisar Nombres

**Problema:** quedan errores de dominio, mensajes incorrectos y contratos confusos.

**Alternativa:** copiar estructura, pero revisar nombres, tipos, rutas, errores y docs.

## 6. Tablas Sin Constraints

**Problema:** la integridad depende de recordar validar en codigo.

**Alternativa:** usar primary keys, unique constraints, foreign keys y checks donde aplique.

## 7. Guardar Relaciones Como Texto o JSON

**Problema:** dificulta consultas, integridad y navegacion del dominio.

**Alternativa:** usar tablas relacion para muchos-a-muchos y foreign keys para relaciones estables.

## 8. Mezclar Raw y Canonico

**Problema:** datos incompletos o ambiguos contaminan el modelo usado por API y frontend.

**Alternativa:** raw en `*_raw`, revision en `*_norm`, datos fiables en `*_db`.

## 9. Resolver Ambigüedad en Silencio

**Problema:** una heuristica incorrecta puede crear datos canonicos falsos.

**Alternativa:** crear estados pending/unresolved y superficies de revision humana.

## 10. Endpoints Sin Schemas

**Problema:** el contrato API queda implicito y el frontend deriva tipos a mano.

**Alternativa:** cada endpoint debe declarar `response_model` y usar schemas de entrada para writes.

## 11. Listas Sin Paginacion

**Problema:** funcionan en desarrollo y fallan cuando el dataset crece.

**Alternativa:** usar `limit`, `offset`, `total` y orden estable.

## 12. Admin Sin Frontera Clara

**Problema:** acciones internas se mezclan con experiencia publica.

**Alternativa:** prefijos `/admin`, features admin separadas y autorizacion a nivel de router.

## 13. Opciones Duplicadas Entre Backend y Frontend

**Problema:** estados, filtros o selects se desincronizan.

**Alternativa:** exponer `/options` desde backend para workflows admin.

## 14. Scripts que se Vuelven Producto

**Problema:** una utilidad temporal termina siendo critica sin logging, idempotencia ni docs.

**Alternativa:** promover a pipeline o service cuando se repite o afecta datos duraderos.

## 15. Pipelines No Idempotentes

**Problema:** repetir una ejecucion duplica datos o rompe relaciones.

**Alternativa:** constraints, upserts, caches y tablas relacion con claves compuestas.

## 16. Configuracion Dispersa

**Problema:** cada modulo lee paths o env vars de forma distinta.

**Alternativa:** configuracion central y `.env.example` actualizado.

## 17. Documentacion Después de Meses

**Problema:** las decisiones se pierden y el codigo se vuelve la unica fuente de verdad.

**Alternativa:** actualizar docs y ADRs cuando cambia arquitectura, datos o flujo operativo.

## 18. Introducir Librerias Sin Necesidad

**Problema:** aumenta superficie de mantenimiento y estilos mezclados.

**Alternativa:** usar patrones existentes salvo que la libreria resuelva un problema real.

## 19. Tests Solo al Final

**Problema:** cuando el sistema crece, nadie sabe si un cambio rompe pipelines o contratos.

**Alternativa:** tests minimos por capa desde que una feature se vuelve importante.

## 20. Ignorar Drift Entre API y Frontend

**Problema:** tipos TypeScript y schemas backend dejan de coincidir.

**Alternativa:** revisar contratos en cada cambio y considerar OpenAPI/clientes generados en proyectos grandes.

## 21. Mega Componentes o Mega Services

**Problema:** una pieza concentra demasiadas razones para cambiar.

**Alternativa:** separar por responsabilidad: page, component, hook, service, repository.

## 22. Rutas con Nombres Inconsistentes

**Problema:** cada feature inventa convenciones y el sistema pierde predictibilidad.

**Alternativa:** rutas plurales, params explicitos y nombres de dominio consistentes.

## 23. Borrar o Reescribir Historial de Decisiones

**Problema:** se pierde por que se eligio una arquitectura.

**Alternativa:** no reescribir ADRs aceptadas; crear una nueva ADR que supersede la anterior.

## 24. Crear Abstracciones Globales Por Estética

**Problema:** la arquitectura se vuelve mas abstracta sin reducir complejidad real.

**Alternativa:** extraer abstracciones solo cuando eliminen duplicacion significativa o fijen un patron probado.

## 25. Dar una Tarea por Terminada Sin Verificacion

**Problema:** cambios incompletos cruzan capas y fallan en uso real.

**Alternativa:** checklist final: rutas registradas, schemas/tipos alineados, docs actualizadas, tests/build/lint ejecutados cuando existan.

