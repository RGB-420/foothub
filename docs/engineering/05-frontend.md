---
comments: true
---

# Frontend

## Stack Base

Patron observado:

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* lucide-react
* react-spinners
* TanStack Query instalado

La arquitectura frontend esta organizada por features y consume exclusivamente la API.

## Estructura por Features

Cada dominio debe vivir en:

```text
frontend/src/features/<domain>/
  api/
  components/
  hooks/
  pages/
  types.ts
```

Ejemplo:

```text
features/clubs/
  api/getClubs.ts
  api/getClubById.ts
  hooks/useClubs.ts
  hooks/useClub.ts
  components/ClubItem.tsx
  pages/ClubsPage.tsx
  pages/ClubDetailPage.tsx
  types.ts
```

Esta estructura hace que cada feature sea facil de inspeccionar, copiar y ampliar.

## App Shell

La aplicacion debe tener una shell estable:

```text
App
  -> BrowserRouter
  -> Layout
  -> Navbar
  -> AppRoutes
```

Responsabilidades:

* `App.tsx`: providers globales y router.
* `layout.tsx`: estructura comun, navbar, max width y fondo.
* `routes.tsx`: tabla de rutas.
* `shared/config/navigation.ts`: navegacion como datos.
* `shared/components/Navbar.tsx`: render de navegacion desktop/mobile.

Las paginas no deben definir navegacion global.

## `shared`

`shared` contiene piezas transversales:

```text
shared/api/client.ts
shared/components/
shared/config/
shared/hooks/
```

Una pieza debe entrar en `shared` solo si la usan varios dominios o claramente pertenece al marco de la aplicacion.

Evitar mover a `shared` demasiado pronto. La reutilizacion prematura puede endurecer componentes que aun estan cambiando.

## Rutas

Centralizar rutas en:

```text
frontend/src/app/routes.tsx
```

Patron:

* `/` para home o dashboard principal
* `/<entities>` para lista
* `/<entities>/:id` para detalle
* `/admin/...` para administracion
* rutas hijas explicitas para workflows especiales

Ejemplo transferible:

```text
/clubs
/clubs/:id
/players
/players/:id
/admin/corrections/clubs
```

## Cliente API

Usar un cliente compartido para:

* prefijo `VITE_API_URL`
* headers comunes
* serializacion JSON
* errores HTTP

Patron actual:

```text
shared/api/client.ts
```

Mejora recomendada:

* incluir mensaje de error del backend cuando exista
* soportar requests sin body
* soportar headers admin/auth de forma controlada
* tipar errores si el proyecto crece

Para proyectos nuevos, este cliente debe ser el unico punto donde se construye la URL base. Las features no deben leer `VITE_API_URL` directamente.

## Tipos

Cada feature define sus tipos en `types.ts`.

Reglas:

* los tipos frontend deben reflejar la respuesta API
* usar `null` cuando el backend puede devolver `null`
* separar lista y detalle si no tienen los mismos campos
* no reutilizar un tipo enorme si la pantalla solo necesita un item pequeno

Nombres recomendados:

```text
ClubListItem
Club
ClubDetail
PaginatedClubs
CreateClubInput
UpdateClubInput
```

## Hooks

Los hooks encapsulan carga de datos y estado.

Patron actual:

* `useState`
* `useEffect`
* `loading`
* `error`
* dato principal

Forma:

```text
useClubs -> { clubs, loading, error }
useClub -> { club, loading, error }
```

Mejora recomendada para futuros proyectos:

* estandarizar TanStack Query para cache, reintentos, invalidacion y mutaciones
* mantener los hooks por feature como fachada aunque usen TanStack Query por debajo

Si se usa TanStack Query, los hooks deben seguir existiendo:

```text
useClub()
useClubs()
useAdminClubCorrections()
```

La pagina no debe conocer keys internas de query salvo que sea estrictamente necesario.

## Paginas

Las paginas componen hooks y componentes.

Responsabilidades:

* leer params de ruta
* llamar hooks
* manejar loading/error/empty
* montar layout de la pantalla
* pasar datos a componentes

Evitar:

* fetch directo en paginas si ya existe capa `api` y `hooks`
* logica de transformacion compleja en JSX
* componentes gigantes que mezclan lista, detalle, formularios y modales

## Componentes Reutilizables

Patrones observados:

* item cards para listas
* secciones colapsables
* navbar
* paginacion
* botones de feedback
* modales
* badges

Reglas:

* componentes de dominio en `features/<domain>/components`
* componentes transversales en `shared/components`
* props tipadas con `type Props`
* botones con estados `disabled`, `loading` o feedback visual cuando aplica
* componentes de lista deben enlazar a detalle de forma consistente
* componentes de navegacion deben leer configuracion, no duplicar rutas a mano

## Diseno Visual

El estilo actual usa Tailwind con tokens simples:

* primary
* background
* text
* border
* variantes dark

Para futuros proyectos:

* definir tokens en Tailwind desde el inicio
* soportar modo claro/oscuro si el producto lo justifica
* mantener layouts estrechos para exploradores de datos
* usar cards para items repetidos, no para cada seccion de pagina
* usar iconos lucide para acciones reconocibles
* mantener estados vacios y loading consistentes

## Formularios

Patron actual:

* estado local por formulario
* funcion `updateField`
* validacion minima antes de enviar
* feedback de guardado
* campos agrupados en grid

Para futuros proyectos:

* mantener formularios simples al principio
* extraer validacion compartida cuando se repita
* usar selects para opciones conocidas
* evitar strings libres para estados si la API puede devolver opciones
* mostrar warnings no bloqueantes cuando una decision humana parezca incompleta
