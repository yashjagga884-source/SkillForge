import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout({ children, onOpenLogin, isSignedIn, signedInEmail, onSignOut }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        onOpenLogin={onOpenLogin}
        isSignedIn={isSignedIn}
        signedInEmail={signedInEmail}
        onSignOut={onSignOut}
      />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
