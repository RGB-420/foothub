---
comments: true
---

# Ejemplo: Pagina Frontend

## Lista

```tsx
import { ClipLoader } from "react-spinners"
import { PlayerItem } from "../components/PlayerItem"
import { usePlayers } from "../hooks/usePlayers"

export const PlayersPage = () => {
  const { players, loading, error } = usePlayers()

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <ClipLoader size={30} color="#3b82f6" />
      </div>
    )
  }

  if (error) return <p className="p-4">{error}</p>
  if (players.length === 0) return <p className="p-4">No players found</p>

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Players</h1>

      <ul className="space-y-2">
        {players.map((player) => (
          <PlayerItem key={player.id_player} player={player} />
        ))}
      </ul>
    </div>
  )
}
```

## Reglas

* La pagina usa hooks.
* La pagina no llama directamente a `apiFetch`.
* La pagina maneja loading, error y empty state.
* La lista delega cada item a un componente.
* El componente de item se encarga del link a detalle.

