import { useParams } from "react-router-dom"
import { publishedAnalyses } from "../content/analyses"
import { AnalysisArticle } from "../components/AnalysisArticle"
import { NotFoundPage } from "../../../shared/components/NotFoundPage"

export const AnalysisDetailPage = () => {
  const { slug } = useParams()
  const analysis = publishedAnalyses.find((entry) => entry.slug === slug)
  return analysis ? <AnalysisArticle analysis={analysis} /> : <NotFoundPage analysis />
}
