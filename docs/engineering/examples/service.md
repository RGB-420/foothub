---
comments: true
---

# Ejemplo: Service

Un service contiene reglas de dominio o coordinacion entre varias piezas.

## Caso

Normalizar un nombre de jugador antes de insertarlo.

```python
import re


def normalize_player_name(value: str | None) -> str | None:
    if value is None:
        return None

    value = re.sub(r"\s+", " ", value).strip()

    if not value:
        return None

    return value.title()
```

## Service Coordinador

```python
from app.repositories.players_repo import upsert_player
from app.services.normalizers.players import normalize_player_name


def create_player_from_import(conn, raw_name: str, position: str | None):
    name = normalize_player_name(raw_name)

    if name is None:
        return None

    return upsert_player(conn, name=name, position=position)
```

## Reglas

* Usar service cuando hay reglas, coordinacion o transformacion.
* Mantener repositorios centrados en persistencia.
* Mantener rutas centradas en HTTP.
* Si el service crece, separarlo por dominio o capacidad.

