import { Navbar } from "../shared/components/Navbar"

type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen text-text">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
