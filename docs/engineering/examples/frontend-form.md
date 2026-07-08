---
comments: true
---

# Ejemplo: Formulario Frontend

## Formulario Simple

```tsx
import { useState } from "react"
import type { CreatePlayerInput } from "../types"

type Props = {
  saving: boolean
  onSave: (data: CreatePlayerInput) => Promise<void>
}

export const PlayerForm = ({ saving, onSave }: Props) => {
  const [form, setForm] = useState<CreatePlayerInput>({
    name: "",
    position: "",
  })

  const updateField = (key: keyof CreatePlayerInput, value: string) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!form.name.trim()) return
    await onSave(form)
  }

  return (
    <div className="space-y-3">
      <label className="space-y-1 text-sm block">
        <span className="font-medium">Name</span>
        <input
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="w-full p-2 rounded-lg border"
        />
      </label>

      <label className="space-y-1 text-sm block">
        <span className="font-medium">Position</span>
        <input
          value={form.position || ""}
          onChange={(event) => updateField("position", event.target.value)}
          className="w-full p-2 rounded-lg border"
        />
      </label>

      <button
        disabled={saving || !form.name.trim()}
        onClick={handleSubmit}
        className="px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  )
}
```

## Reglas

* El formulario recibe `saving` y `onSave`.
* La mutacion real vive en hook o pagina contenedora.
* La validacion frontend mejora UX, pero no reemplaza validacion backend.
* Usar selects cuando las opciones vienen de `/options`.
* Mostrar warnings si hay estados inconsistentes.

