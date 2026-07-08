---
comments: true
---

# Ejemplo: Endpoint FastAPI

## Ruta Fina

```python
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.dependencies.database import get_db
from app.repositories.players_repo import count_players, get_player_by_id, get_players
from app.schemas.player import PaginatedPlayers, Player

router = APIRouter(prefix="/players", tags=["players"])


@router.get("", response_model=PaginatedPlayers)
def list_players(
    limit: int = Query(20, ge=1, le=200),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    return {
        "data": get_players(db, limit=limit, offset=offset),
        "total": count_players(db),
        "limit": limit,
        "offset": offset,
    }


@router.get("/{player_id}", response_model=Player)
def get_player(player_id: int, db: Session = Depends(get_db)):
    player = get_player_by_id(db, player_id)

    if player is None:
        raise HTTPException(status_code=404, detail="Player not found")

    return player
```

## Reglas

* La ruta valida parametros.
* La ruta llama repositorios o servicios.
* La ruta traduce casos de dominio a errores HTTP.
* La ruta no contiene SQL.
* La ruta no contiene transformaciones largas.

## Anti-ejemplo

No hacer esto:

```python
@router.get("/players")
def list_players(db: Session = Depends(get_db)):
    rows = db.execute("SELECT * FROM players").fetchall()
    return [dict(row) for row in rows]
```

Problemas:

* SQL dentro del handler.
* Sin schema de respuesta.
* Sin paginacion.
* Conversion improvisada.
* Dificil de testear y mantener.

