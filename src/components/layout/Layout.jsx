import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout({ children, isDark, toggleTheme }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main className="flex-1 container mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}
