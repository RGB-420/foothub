---
comments: true
---

# Ejemplo: Entidad Nueva

Este ejemplo muestra como anadir una entidad `players` a una aplicacion nueva.

## Objetivo

Crear una entidad navegable con:

* tabla canonica
* repositorio
* schemas
* rutas API
* tipos frontend
* llamadas API
* hooks
* pagina de lista
* pagina de detalle

## Estructura Esperada

```text
app/
  api/routes/players.py
  repositories/players_repo.py
  schemas/player.py

frontend/src/features/players/
  api/getPlayerById.ts
  api/getPlayers.ts
  components/PlayerItem.tsx
  hooks/usePlayer.ts
  hooks/usePlayers.ts
  pages/PlayerDetailPage.tsx
  pages/PlayersPage.tsx
  types.ts
```

## Tabla

```sql
CREATE TABLE app_db.players
(
    id_player integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    position text,
    created_at timestamp with time zone DEFAULT NOW(),
    PRIMARY KEY (id_player),
    UNIQUE (name)
);
```

## API Publica

```text
GET /players?limit=20&offset=0
GET /players/{player_id}
```

## Checklist

* La entidad vive en el schema canonico.
* La ruta API no contiene SQL.
* El repositorio devuelve datos con la forma esperada por el schema.
* El frontend no llama directamente a `fetch`; usa la capa `api/`.
* La pagina usa hooks y maneja loading, error y empty state.
* La entidad se anade a navegacion solo si debe ser top-level.
* Se actualizan docs de API y modelo de datos.

