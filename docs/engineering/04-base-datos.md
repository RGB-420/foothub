---
comments: true
---

# Base de Datos y Modelo de Datos

## Principio

La base de datos es el sistema de registro de la aplicacion.

Los archivos CSV, Excel o JSON pueden existir, pero como entradas, salidas, colas, revisiones o artefactos temporales. El producto debe leer principalmente de datos canonicos en PostgreSQL.

## Separacion por Schemas

El patron mas importante detectado es separar responsabilidades en schemas.

Para proyectos futuros:

```text
<app>_raw
<app>_norm
<app>_db
```

Responsabilidades:

* `<app>_raw`: datos recibidos tal como llegan
* `<app>_norm`: alias, revisiones, estados intermedios y normalizacion
* `<app>_db`: entidades canonicas que alimentan API y frontend

En un CRM de clubes de futbol:

```text
football_raw.imported_members
football_norm.club_aliases
football_db.clubs
football_db.players
football_db.teams
```

## Entidades Canonicas

Las tablas canonicas deben representar conceptos duraderos del dominio.

Reglas:

* usar claves primarias tecnicas con identidad
* usar nombres humanos como campos con `UNIQUE` cuando correspondan
* separar relaciones muchos-a-muchos en tablas puente
* guardar `created_at` en entidades relevantes
* evitar almacenar listas serializadas cuando una relacion merece tabla

Patron de tabla:

```sql
CREATE TABLE app_db.clubs
(
    id_club integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT NOW(),
    PRIMARY KEY (id_club),
    UNIQUE (name)
);
```

## Relaciones

Usar tablas puente para relaciones muchos-a-muchos:

```text
boat_owner
boat_clubs
boat_editions
edition_classes
```

Formato recomendado:

```text
<left_entity>_<right_entity>
```

o, si ya existe una convencion del proyecto:

```text
<left_plural>_<right_plural>
```

Lo importante es que la clave compuesta sea clara y evite duplicados.

## Raw Data

Cuando se ingieren datos heterogeneos, preservar el payload original o semi-original.

Patron recomendado:

```sql
CREATE TABLE app_raw.raw_import_results
(
    id_raw_result integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    source_type text,
    source_page text,
    source_name text,
    imported_at timestamp with time zone DEFAULT NOW(),
    raw_data jsonb,
    PRIMARY KEY (id_raw_result)
);
```

Ventajas:

* trazabilidad
* reprocesamiento
* auditoria
* posibilidad de mejorar normalizadores sin repetir ingestion
* tolerancia a fuentes con columnas distintas

## Normalizacion y Alias

Para valores ambiguos usar tablas de alias.

Patron:

```text
canonical_entity
entity_aliases
entity_alias_relations
```

Campos utiles:

* raw value
* normalized value
* canonical id
* status
* confidence
* notes
* reviewed_by
* reviewed_at
* created_at

Estados recomendados:

* `pending`: necesita revision
* `resolved`: aceptado y mapeado
* `unresolved`: revisado pero sin resolucion
* `ignored`: no debe entrar en canonico

Este patron es transferible a clubes, personas, empresas, productos, direcciones, categorias, etiquetas y cualquier dato externo con variaciones.

## Upserts e Idempotencia

Los pipelines y scripts deben poder ejecutarse mas de una vez sin duplicar datos.

Usar:

* constraints `UNIQUE`
* `ON CONFLICT`
* tablas puente con primary key compuesta
* caches de ids durante procesos batch

El resultado ideal es que repetir un pipeline actualice o ignore lo ya conocido, y solo anada novedades reales.

## SQL Explicito

El proyecto favorece SQL textual en repositorios.

Ventajas:

* consultas faciles de leer
* control sobre joins y agregaciones
* salida alineada con schemas Pydantic
* menor magia para IA y revisores humanos

Recomendacion:

* mantener SQL en repositorios
* parametrizar siempre
* devolver diccionarios listos para schemas
* centralizar helpers de conversion

## Migraciones

El proyecto actual usa `schema.sql` como definicion principal. Para futuros proyectos:

* empezar con `schema.sql` si el proyecto esta en fase local o temprana
* introducir Alembic o migraciones SQL versionadas cuando haya datos reales compartidos
* no editar tablas productivas sin migracion revisable

Estructura recomendada:

```text
db/
  schema.sql
  migrations/
    001_initial.sql
    002_add_feedback.sql
```

## Calidad de Datos

Crear mecanismos de calidad desde el inicio:

* dashboards de metricas
* endpoints admin para issues
* conteos por estado
* warnings en pipelines
* reportes semanales
* logs por proceso

La calidad de datos no debe depender solo de recordar revisar manualmente.

