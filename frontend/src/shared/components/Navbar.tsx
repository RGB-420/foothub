import { Link } from "react-router-dom"
import { navigationItems } from "../config/navigation"

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link className="font-display text-2xl font-bold uppercase tracking-[0.14em] text-text" to="/">
          RGB
        </Link>

        <div className="flex items-center gap-1">
          {navigationItems.map((item) => (
            <a
              className="rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-cyan"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
