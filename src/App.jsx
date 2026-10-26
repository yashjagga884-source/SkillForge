import { useCallback, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ToastContainer } from './components/common/Toast'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Careers } from './pages/Careers'
import { CareerDetails } from './pages/CareerDetails'
import { Technologies } from './pages/Technologies'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'
import { Quizzes } from './pages/Quizzes'
import { Pricing } from './pages/Pricing'
import { LoginModal } from './components/common/LoginModal'

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(true)
  const [signedInEmail, setSignedInEmail] = useState('')
  const [accounts, setAccounts] = useState([
    { email: 'demo@skillforge.ai', password: 'SkillForge123' },
  ])

  const openLogin = useCallback(() => setIsLoginOpen(true), [])
  const closeLogin = useCallback(() => setIsLoginOpen(false), [])
  const signIn = useCallback((email) => {
    setSignedInEmail(email)
    setIsLoginOpen(false)
  }, [])
  const registerAccount = useCallback((account) => {
    setAccounts((currentAccounts) => [...currentAccounts, account])
  }, [])
  const signOut = useCallback(() => setSignedInEmail(''), [])

  return (
    <ThemeProvider>
      <Router>
        <ToastContainer />
        <Layout
          onOpenLogin={openLogin}
          isSignedIn={Boolean(signedInEmail)}
          signedInEmail={signedInEmail}
          onSignOut={signOut}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:id" element={<CareerDetails />} />
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        {isLoginOpen && (
          <LoginModal
            accounts={accounts}
            demoAccount={accounts[0]}
            onClose={closeLogin}
            onRegister={registerAccount}
            onSignIn={signIn}
          />
        )}
      </Router>
    </ThemeProvider>
  )
}

export default App
