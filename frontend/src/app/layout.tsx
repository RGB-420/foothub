import { Navbar } from "../shared/components/Navbar"

type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen text-text">
      <Navbar />
      <main>{children}</main>
      <footer className="site-footer border-t border-border bg-background">
        <div className="page-container flex items-center justify-end py-6">
          <img
            alt="RGB 420"
            className="h-auto w-28"
            width="1900"
            height="755"
            src="/images/brand/rgb-420.png"
          />
        </div>
      </footer>
    </div>
  )
}
