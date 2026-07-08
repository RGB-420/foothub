---
comments: true
---

# Ejemplo: Conexion Frontend-Backend

## Tipo

```ts
export interface Player {
  id_player: number
  name: string
  position: string | null
}

export interface PaginatedPlayers {
  data: Player[]
  total: number
  limit: number
  offset: number
}
```

## Funcion API

```ts
import { apiFetch } from "../../../shared/api/client"
import type { PaginatedPlayers } from "../types"

export const getPlayers = (
  limit = 20,
  offset = 0
): Promise<PaginatedPlayers> => {
  return apiFetch(`/players?limit=${limit}&offset=${offset}`)
}
```

## Hook

```ts
import { useEffect, useState } from "react"
import { getPlayers } from "../api/getPlayers"
import type { Player } from "../types"

export const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)

    getPlayers()
      .then((response) => setPlayers(response.data))
      .catch(() => setError("Error loading players"))
      .finally(() => setLoading(false))
  }, [])

  return { players, loading, error }
}
```

## Reglas

* `types.ts` refleja el contrato API.
* `api/` llama al cliente compartido.
* `hooks/` encapsula estado de carga.
* `pages/` consume hooks.
* Ningun componente construye URLs de backend directamente.

