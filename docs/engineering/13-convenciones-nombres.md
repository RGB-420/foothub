---
comments: true
---

# Convenciones de Nombres

Este documento reduce margen de interpretacion. Si un proyecto decide otra convencion, debe documentarla antes de escribir codigo.

## Idioma

Usar ingles en codigo, rutas, tablas y nombres de archivos.

La documentacion puede estar en espanol si el equipo trabaja en espanol, pero los identificadores tecnicos deben ser consistentes.

## Entidades

Usar singular para clases, tipos y schemas de una entidad:

```text
Club
Player
Team
Season
```

Usar plural para colecciones, rutas y carpetas feature:

```text
/clubs
/players
features/clubs
features/players
```

## Base de Datos

Convencion recomendada para nuevos proyectos:

* tablas en plural: `clubs`, `players`
* primary key: `id_<entity>` si se quiere mantener el estilo del proyecto original
* foreign key: `id_<entity>`
* tablas puente: `<left>_<right>` o `<left_plural>_<right_plural>`, elegir una y mantenerla
* timestamps: `created_at`, `updated_at`
* schema canonico: `<app>_db`
* schema raw: `<app>_raw`
* schema normalizacion: `<app>_norm`

Ejemplo:

```text
football_db.clubs
football_db.players
football_db.team_players
football_norm.club_aliases
football_raw.raw_import_results
```

## API

Rutas:

```text
GET /clubs
GET /clubs/{club_id}
GET /clubs/{club_id}/players
POST /admin/clubs
PATCH /admin/clubs/{club_id}
```

Params path:

```text
club_id
player_id
issue_key
```

No usar `id` generico en rutas si hay posibilidad de confusion.

## Python

Archivos:

```text
app/api/routes/clubs.py
app/repositories/clubs_repo.py
app/schemas/club.py
app/services/sync/clubs/run_club_sync_pipeline.py
```

Funciones de repositorio:

```text
get_clubs
get_club_by_id
count_clubs
upsert_club
load_club_cache
insert_club_relation
update_club_status
```

Schemas:

```text
Club
ClubDetail
ClubListItem
PaginatedClubs
CreateClub
UpdateClub
ClubOptions
```

## TypeScript

Feature:

```text
features/clubs/types.ts
features/clubs/api/getClubs.ts
features/clubs/api/getClubById.ts
features/clubs/hooks/useClubs.ts
features/clubs/hooks/useClub.ts
features/clubs/pages/ClubsPage.tsx
features/clubs/pages/ClubDetailPage.tsx
features/clubs/components/ClubItem.tsx
```

Hooks:

```text
useClubs
useClub
useClubPlayers
useAdminClubCorrections
```

Components:

```text
ClubItem
ClubDetailPage
AdminClubCorrectionCard
QualityMetricCard
```

## Estados

Estados de revision:

```text
pending
resolved
unresolved
ignored
```

Estados de feedback:

```text
pending
reviewed
fixed
ignored
```

No inventar estados nuevos sin documentar su semantica y actualizar options backend/frontend.

## Archivos Operativos

Usar nombres que indiquen fase y dominio:

```text
data/raw/<domain>_raw.csv
data/master/<domain>_master.csv
data/mapping/<domain>/<domain>_mapping_review.csv
data/review/<domain>_mapping_pending.csv
data/queue/<domain>_queue.csv
data/report/<report_name>.csv
data/debug/<domain>_before_<step>.csv
```

## Commits y ADRs

ADRs:

```text
adr-001-database-first-architecture.md
adr-002-raw-vs-canonical-layer.md
```

Usar numero secuencial y titulo estable.

