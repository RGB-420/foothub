import { useEffect, useRef } from "react"
import { useLocation, useNavigationType } from "react-router-dom"
import { profileContent } from "../features/home/content/profileContent"

export const RouteNavigation = () => {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()
  const previousPath = useRef<string>()
  useEffect(() => {
    const routeChanged = previousPath.current !== pathname
    previousPath.current = pathname
    const heading = document.querySelector<HTMLElement>("main h1")
    document.title = pathname === "/"
      ? `${profileContent.name} | Análisis táctico de fútbol`
      : `${heading?.textContent ?? "Portfolio"} | ${profileContent.name}`
    if (routeChanged) {
      heading?.setAttribute("tabindex", "-1")
      heading?.focus({ preventScroll: true })
    }

    let target: HTMLElement | null = null
    if (hash) {
      try {
        target = document.getElementById(decodeURIComponent(hash.slice(1)))
      } catch {
        // Malformed URL fragments are treated like unknown targets.
      }
    }
    if (target) target.scrollIntoView()
    else if (routeChanged && navigationType !== "POP") window.scrollTo(0, 0)
  }, [pathname, hash, navigationType])
  return null
}
