import { BrowserRouter } from "react-router-dom"
import { Layout } from "./layout"
import { AppRoutes } from "./routes"

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  )
}
