import { BrowserRouter } from "react-router-dom"
import { Layout } from "./layout"
import { AppRoutes } from "./routes"
import { RouteNavigation } from "./RouteNavigation"

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
      <RouteNavigation />
    </BrowserRouter>
  )
}
