---
comments: true
---

# Ejemplo: Repository

Los repositorios encapsulan persistencia.

## Repository SQL

```python
from sqlalchemy import text

from app.core.db import row_to_dict, rows_to_dict


def get_players(conn, limit: int, offset: int):
    query = text("""
        SELECT id_player, name, position
        FROM app_db.players
        ORDER BY name
        LIMIT :limit
        OFFSET :offset
    """)

    return rows_to_dict(conn.execute(query, {"limit": limit, "offset": offset}))


def get_player_by_id(conn, player_id: int):
    query = text("""
        SELECT id_player, name, position
        FROM app_db.players
        WHERE id_player = :player_id
    """)

    return row_to_dict(conn.execute(query, {"player_id": player_id}).fetchone())


def count_players(conn):
    return conn.execute(text("SELECT COUNT(*) FROM app_db.players")).scalar()
```

## Upsert

```python
def upsert_player(conn, name: str, position: str | None = None):
    query = text("""
        INSERT INTO app_db.players (name, position)
        VALUES (:name, :position)
        ON CONFLICT (name) DO UPDATE SET
            position = COALESCE(EXCLUDED.position, app_db.players.position)
        RETURNING id_player, (xmax = 0) AS inserted
    """)

    row = conn.execute(query, {"name": name, "position": position}).fetchone()
    return row[0], row[1]
```

## Reglas

* Parametrizar siempre.
* Mantener SQL legible.
* Devolver dicts o estructuras listas para schemas.
* No hacer commits dentro del repositorio si la transaccion la controla el caller.
* No mezclar HTTP, UI ni transformaciones complejas.

