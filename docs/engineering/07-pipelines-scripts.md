---
comments: true
---

# Pipelines, Scripts y Datos Operativos

## Cuándo Usar un Pipeline

Usar pipeline cuando hay un flujo repetible con varios pasos y efectos sobre datos.

Ejemplos:

* importar fuentes
* normalizar entidades
* sincronizar masters
* generar datos canonicos
* recalcular metricas
* exportar pendientes de revision

Un pipeline debe tener nombre estable y poder ejecutarse desde CLI.

## CLI Central

Patron recomendado:

```bash
python scripts/pipeline_cli.py run <pipeline>
```

Mantener un diccionario de pipelines:

```python
PIPELINES = {
    "clubs": run_clubs_pipeline,
    "players": run_players_pipeline,
    "full": run_full_pipeline,
}
```

Ventajas:

* entrada unica para procesos operativos
* facil de documentar
* facil de ejecutar por humanos e IA
* logs consistentes
* nombres controlados

## Orquestador

El pipeline `full` debe vivir en un orquestador y ejecutar dominios en orden.

Ejemplo conceptual:

```text
reference data
  -> imports
  -> normalisation
  -> canonical entities
  -> quality reports
```

El orden importa. Documentarlo.

## Logging

Usar logger comun para pipelines.

Formato recomendado:

```text
timestamp | level | module | message
```

Escribir en:

* consola
* archivo en `logs/`

Evitar duplicar handlers. Incluir logs de:

* inicio y fin de pipeline
* numero de filas leidas
* numero de filas generadas
* inserts/updates
* warnings de datos pendientes
* errores con contexto

## Caches en Procesos Batch

Para pipelines que insertan relaciones, cargar caches al principio:

* entidades existentes
* relaciones existentes
* ids canonicos

Esto evita consultas repetidas y hace los pipelines mas idempotentes.

Patron:

```text
load_entity_cache()
load_relation_cache()
for row in rows:
    find or upsert entity
    insert relation if missing
```

## Normalizadores

Los normalizadores convierten datos externos en campos del dominio.

Responsabilidades:

* limpiar espacios
* normalizar mayusculas/minusculas
* separar valores multiples
* inferir valores cuando la regla sea clara
* crear alias pendientes cuando no hay match
* excluir valores ambiguos del canonico hasta revision

No deben ocultar decisiones irreversibles. Si una normalizacion es dudosa, crear pendiente.

## Mappings

Usar mappings para convertir valores raw a canonicos.

Soportes posibles:

* CSV durante fases tempranas
* tablas de normalizacion cuando el flujo madure
* pantallas admin para revision

Campos recomendados:

* raw value
* canonical value
* status
* confidence
* notes
* source

## Scripts

Usar `scripts/` para comandos concretos:

* generar informes
* reconstruir pendientes
* exportar datos de cliente
* recuperar revisiones
* descubrir nuevas fuentes

Reglas:

* nombre descriptivo
* evitar side effects sorpresa
* leer configuracion central
* loggear resultados importantes
* promover a pipeline si se vuelve parte del flujo normal

## Reports y Scorecards

Los reportes periodicos pertenecen a `scripts/` si solo leen datos y generan salida.

Promoverlos a modulo de aplicacion o pipeline cuando:

* alimentan pantallas
* se ejecutan automaticamente
* escriben datos persistentes
* forman parte de decisiones operativas

Los scorecards deben indicar periodo, fuente de datos y definicion de cada metrica.

## Datos Debug

El proyecto usa salidas intermedias en `data/debug` y `data/raw`. Este patron es bueno para pipelines de datos.

Recomendacion:

* guardar snapshots utiles antes/despues de pasos complejos
* no depender de debug como fuente de verdad
* limpiar o rotar si crece demasiado

## Errores

Cuando un paso falla:

* loggear contexto del item procesado
* marcar estado operativo si existe cola
* fallar el pipeline si continuar produciria datos incoherentes
* continuar solo si el error afecta a una fuente aislada y esta registrado

La regla es preservar integridad antes que completar a toda costa.
