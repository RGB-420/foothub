---
comments: true
---

# Ejemplo: Tabla de Base de Datos

## Entidad Canonica

```sql
CREATE TABLE app_db.players
(
    id_player integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    position text,
    id_club integer,
    created_at timestamp with time zone DEFAULT NOW(),
    PRIMARY KEY (id_player),
    UNIQUE (name, id_club)
);
```

## Relacion

```sql
CREATE TABLE app_db.team_players
(
    id_team integer NOT NULL,
    id_player integer NOT NULL,
    season_year integer NOT NULL,
    PRIMARY KEY (id_team, id_player, season_year)
);
```

## Alias Revisable

```sql
CREATE TABLE app_norm.player_aliases
(
    id_alias integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    raw_name text NOT NULL,
    normalized_name text,
    id_player integer,
    status text NOT NULL DEFAULT 'pending',
    confidence text,
    notes text,
    reviewed_by text,
    reviewed_at timestamp,
    created_at timestamp DEFAULT NOW(),
    PRIMARY KEY (id_alias),
    UNIQUE (raw_name)
);
```

## Reglas

* Canonico en `app_db`.
* Raw en `app_raw`.
* Revision y alias en `app_norm`.
* Muchos-a-muchos siempre con tabla relacion.
* Constraints antes que validaciones solo en frontend.
* Documentar el modelo despues de cambiarlo.

