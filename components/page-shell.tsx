import { Nav } from './nav'
import { Footer } from './footer'

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col font-sans bg-c-black">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
