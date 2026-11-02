import { useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { navigationItems } from "../config/navigation"
import { profileContent } from "../../features/home/content/profileContent"

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  return (
    <header className="site-header sticky top-0 z-20 border-b border-border bg-background">
      <nav aria-label="Navegación principal" className="page-container flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3" onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false)
          menuButton.current?.focus()
        }
      }}>
        <a className="inline-flex min-h-11 items-center font-display text-xl font-bold uppercase tracking-wide text-text sm:text-2xl" href="/">
          {profileContent.name}
        </a>

        <button ref={menuButton} type="button" className="mobile-menu-toggle button button-secondary" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
        <div id="primary-navigation" className={`primary-navigation flex flex-wrap items-center gap-1${menuOpen ? " is-open" : ""}`}>
          {navigationItems.map((item) => (
            <a
              className="nav-link"
              href={item.href}
              key={item.href}
              onClick={() => {
                setMenuOpen(false)
                if (window.matchMedia("(max-width: 767px)").matches) menuButton.current?.focus()
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
