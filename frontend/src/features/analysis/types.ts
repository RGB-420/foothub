export type AnalysisAsset = {
  kind: "pdf" | "pptx" | "image" | "video"
  label: string
  href: string
}

export type Analysis = {
  slug: string
  status: "draft" | "published"
  publishedAt: string // ISO calendar date: YYYY-MM-DD
  title: string
  summary: string
  author: string
  type: string
  context: string
  scope: string
  objective?: string
  // When supplied, replaces the legacy body order; references reuse reviewed content.
  sections?: {
    id: string
    title: string
    blocks: (
      | { kind: "text"; text: string }
      | { kind: "findings"; items: string[] }
      | { kind: "evidence"; evidenceId: string }
      | { kind: "observation"; observationId: string }
    )[]
  }[]
  featured?: boolean
  preview?: { src: string; alt: string }
  executiveFindings?: string[]
  observations?: {
    id: string
    title: string
    observation: string
    interpretation?: string
    implications?: string
    evidenceIds?: string[]
  }[]
  evidence?: {
    id: string
    label: string
    caption: string
    source?: string
    matchContext?: string
    image?: { src: string; alt: string; width?: number; height?: number }
    video?: {
      src: string
      title: string
      description: string
      width?: number
      height?: number
      poster?: string
      captions?: { src: string; srcLang: string; label: string }
    }
    href?: string
  }[]
  methodology?: string
  limitations?: string
  assets?: AnalysisAsset[]
}
