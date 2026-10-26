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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ToastContainer />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:id" element={<CareerDetails />} />
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
