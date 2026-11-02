import type { Analysis } from "../types"

// Register only real, reviewed work here. Drafts never appear in public routes.
export const analyses: Analysis[] = []

/** Check manually registered content, without a runtime schema dependency. */
export const validateAnalyses = (
  entries: readonly Analysis[],
  assetExists?: (path: string) => boolean,
) => {
  const errors: string[] = []
  const slugs = new Set<string>()
  const identifier = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  let featuredCount = 0
  entries.forEach((entry, index) => {
    const prefix = `Analysis ${index + 1} (${entry.slug || "missing slug"})`
    const fail = (field: string, message: string) => errors.push(`${prefix}: ${field} ${message}`)
    const required = (field: string, value: string) => {
      if (typeof value !== "string" || !value.trim()) fail(field, "must be non-empty")
    }
    if (!identifier.test(entry.slug)) fail("slug", "must use lowercase letters/digits separated by single hyphens")
    if (slugs.has(entry.slug)) fail("slug", "must be unique")
    slugs.add(entry.slug)
    if (entry.status !== "draft" && entry.status !== "published") fail("status", 'must be "draft" or "published"')
    for (const field of ["title", "summary", "author", "type", "context", "scope"] as const) required(field, entry[field])
    const date = new Date(`${entry.publishedAt}T00:00:00Z`)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.publishedAt) ||
      !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== entry.publishedAt) {
      fail("publishedAt", "must be a real calendar date in YYYY-MM-DD format")
    }
    if (entry.status === "published" && entry.featured) featuredCount++

    const reference = (field: string, value: string, localOnly = false) => {
      if (typeof value !== "string") { fail(field, "must be a path string"); return }
      // Canonical unencoded local paths prohibit traversal, queries, fragments,
      // backslashes and protocol-relative URLs. Files belong to this report.
      const localPrefix = `/analyses/${entry.slug}/`
      if (value.startsWith(localPrefix) &&
        value.slice(localPrefix.length).split("/").every((part) => /^[a-zA-Z0-9_-][a-zA-Z0-9_.-]*$/.test(part))) {
        if (assetExists && !assetExists(value)) fail(field, `references a missing public file: ${value}`)
        return
      }
      if (!localOnly && /^https?:\/\//.test(value)) {
        try {
          const url = new URL(value)
          if (url.hostname && !url.username && !url.password && !/[\s\\]/.test(value)) return
        } catch { /* Report a clear field error below. */ }
      }
      fail(field, `must be a safe /analyses/${entry.slug}/file path${localOnly ? "" : " or an HTTP(S) URL without credentials"}`)
    }
    const dimensions = (field: string, media: { width?: number; height?: number }) => {
      if (media.width === undefined && media.height === undefined) return
      if (!Number.isSafeInteger(media.width) || !Number.isSafeInteger(media.height) ||
        (media.width ?? 0) <= 0 || (media.height ?? 0) <= 0) fail(field, "width and height must both be positive integers")
    }
    const extension = (field: string, path: string, pattern: RegExp) => {
      if (typeof path !== "string" || !pattern.test(path)) fail(field, "has an unsupported media extension")
    }
    if (entry.preview) {
      required("preview.alt", entry.preview.alt)
      reference("preview.src", entry.preview.src, true)
    }
    const evidenceIds = new Set<string>()
    entry.evidence?.forEach((item, i) => {
      const field = `evidence[${i}]`
      if (!identifier.test(item.id) || evidenceIds.has(item.id)) fail(`${field}.id`, "must be unique within the report and lowercase hyphenated")
      evidenceIds.add(item.id)
      required(`${field}.label`, item.label)
      required(`${field}.caption`, item.caption)
      if (item.image) {
        required(`${field}.image.alt`, item.image.alt)
        reference(`${field}.image.src`, item.image.src, true)
        dimensions(`${field}.image`, item.image)
      }
      if (item.image && item.video) fail(field, "must not combine image and video; use video.poster")
      if (item.video) {
        const video = item.video
        required(`${field}.video.title`, video.title)
        required(`${field}.video.description`, video.description)
        reference(`${field}.video.src`, video.src, true)
        extension(`${field}.video.src`, video.src, /\.(mp4|webm)$/i)
        dimensions(`${field}.video`, video)
        if (video.poster !== undefined) {
          reference(`${field}.video.poster`, video.poster, true)
          extension(`${field}.video.poster`, video.poster, /\.(png|jpe?g|webp|avif|gif|svg)$/i)
        }
        if (video.captions) {
          reference(`${field}.video.captions.src`, video.captions.src, true)
          extension(`${field}.video.captions.src`, video.captions.src, /\.vtt$/i)
          required(`${field}.video.captions.label`, video.captions.label)
          if (!/^[a-zA-Z]{2,3}(?:-[a-zA-Z0-9]{2,8})*$/.test(video.captions.srcLang)) fail(`${field}.video.captions.srcLang`, "must be a language tag")
        }
      }
      if (item.href !== undefined) reference(`${field}.href`, item.href)
    })
    const observationIds = new Set<string>()
    entry.observations?.forEach((item, i) => {
      const field = `observations[${i}]`
      if (!identifier.test(item.id) || observationIds.has(item.id)) fail(`${field}.id`, "must be unique within the report and lowercase hyphenated")
      observationIds.add(item.id)
      required(`${field}.title`, item.title)
      required(`${field}.observation`, item.observation)
      item.evidenceIds?.forEach((id) => {
        if (!evidenceIds.has(id)) fail(`${field}.evidenceIds`, `references unknown evidence ID "${id}"`)
      })
      if (new Set(item.evidenceIds).size !== (item.evidenceIds?.length ?? 0)) fail(`${field}.evidenceIds`, "must not contain duplicate references")
    })
    if (entry.objective !== undefined) required("objective", entry.objective)
    entry.evidence?.forEach((item, i) => {
      if (item.source !== undefined) required(`evidence[${i}].source`, item.source)
      if (item.matchContext !== undefined) required(`evidence[${i}].matchContext`, item.matchContext)
    })
    const sectionIds = new Set<string>()
    const displayedEvidence = new Set<string>()
    const displayedObservations = new Set<string>()
    if (entry.sections && !entry.sections.length) fail("sections", "must not be empty; omit to use the W3 body")
    entry.sections?.forEach((section, i) => {
      const field = `sections[${i}]`
      if (!identifier.test(section.id) || sectionIds.has(section.id)) fail(`${field}.id`, "must be unique and lowercase hyphenated")
      sectionIds.add(section.id)
      required(`${field}.title`, section.title)
      if (!section.blocks.length) fail(`${field}.blocks`, "must not be empty")
      section.blocks.forEach((block, j) => {
        const blockField = `${field}.blocks[${j}]`
        switch (block.kind) {
          case "text": required(`${blockField}.text`, block.text); break
          case "findings":
            if (!block.items.length) fail(`${blockField}.items`, "must not be empty")
            block.items.forEach((text) => required(`${blockField}.items`, text))
            break
          case "evidence":
            if (!evidenceIds.has(block.evidenceId)) fail(blockField, "references unknown evidence ID")
            if (displayedEvidence.has(block.evidenceId)) fail(blockField, "must not repeat evidence")
            displayedEvidence.add(block.evidenceId)
            break
          case "observation":
            if (!observationIds.has(block.observationId)) fail(blockField, "references unknown observation ID")
            if (displayedObservations.has(block.observationId)) fail(blockField, "must not repeat observation")
            displayedObservations.add(block.observationId)
            break
          default: fail(blockField, "has unsupported block kind")
        }
      })
    })
    if (entry.sections) {
      evidenceIds.forEach((id) => { if (!displayedEvidence.has(id)) fail("sections", `must display evidence "${id}"`) })
      observationIds.forEach((id) => { if (!displayedObservations.has(id)) fail("sections", `must display observation "${id}"`) })
    }
    entry.assets?.forEach((asset, i) => {
      required(`assets[${i}].label`, asset.label)
      if (!["pdf", "pptx", "image", "video"].includes(asset.kind)) fail(`assets[${i}].kind`, "must be pdf, pptx, image or video")
      reference(`assets[${i}].href`, asset.href)
    })
  })
  if (featuredCount > 1) errors.push("Only one published analysis may be featured; clear the extra featured flags")
  if (errors.length) throw new Error(`Publication validation failed:\n${errors.join("\n")}`)
}

// Also fail immediately in development when the registry is edited.
validateAnalyses(analyses)

export const publishedAnalyses = analyses
  .filter((analysis) => analysis.status === "published")
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

export const featuredAnalysis = publishedAnalyses.find((analysis) => analysis.featured) ?? publishedAnalyses[0]

export const formatPublicationDate = (date: string) =>
  new Intl.DateTimeFormat("es-ES", { dateStyle: "long", timeZone: "UTC" })
    .format(new Date(`${date}T00:00:00Z`))
