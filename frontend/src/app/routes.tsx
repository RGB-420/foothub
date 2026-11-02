import { Route, Routes } from "react-router-dom"
import { HomePage } from "../features/home/pages/HomePage"
import { AnalysisIndexPage } from "../features/analysis/pages/AnalysisIndexPage"
import { AnalysisDetailPage } from "../features/analysis/pages/AnalysisDetailPage"
import { NotFoundPage } from "../shared/components/NotFoundPage"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/analisis" element={<AnalysisIndexPage />} />
      <Route path="/analisis/:slug" element={<AnalysisDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
