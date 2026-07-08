---
comments: true
---

# Ejemplo: CRUD Completo

Este ejemplo muestra el recorrido completo para una entidad editable `players`.

## Endpoints

```text
GET    /players
GET    /players/{player_id}
POST   /admin/players
PATCH  /admin/players/{player_id}
DELETE /admin/players/{player_id}
```

Usar rutas publicas para lectura si la entidad es visible para usuarios normales. Usar rutas admin para mutaciones si la edicion es interna.

## Backend

```text
app/api/routes/players.py
app/api/routes/admin_players.py
app/repositories/players_repo.py
app/schemas/player.py
app/schemas/admin_player.py
```

`players.py` expone lectura publica.

`admin_players.py` expone creacion, actualizacion y borrado con dependencia admin.

## Schemas

```python
class Player(BaseModel):
    id_player: int
    name: str
    position: str | None = None

class PaginatedPlayers(BaseModel):
    data: list[Player]
    total: int
    limit: int
    offset: int

class CreatePlayer(BaseModel):
    name: str
    position: str | None = None

class UpdatePlayer(BaseModel):
    name: str | None = None
    position: str | None = None
```

## Frontend

```text
features/players/
  api/
  hooks/
  pages/
  components/
  types.ts

features/adminPlayers/
  api/
  hooks/
  pages/
  components/
  types.ts
```

Separar feature publica y feature admin cuando los flujos y pantallas sean distintos.

## Checklist

* Crear y actualizar usan schemas diferentes.
* `PATCH` acepta actualizacion parcial.
* La lista es paginada si puede crecer.
* Las mutaciones invalidan o refrescan datos en frontend.
* Las rutas admin estan protegidas.
* Los errores de validacion vuelven como errores API claros.
* La documentacion API lista los endpoints nuevos.

