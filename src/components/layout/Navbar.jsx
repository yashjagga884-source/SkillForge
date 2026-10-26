import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { motion } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Careers', path: '/careers' },
    { label: 'Technologies', path: '/technologies' },
    { label: 'Quizzes', path: '/quizzes' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="sticky top-0 z-50 bg-[#0B3B70] text-white border-b border-[#0B3B70] shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold font-poppins text-white hover:scale-[1.02] transition-transform"
          >
            <span className="text-3xl"></span>
            <span className="hidden sm:inline">SkillForge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) => `rounded-md px-3 py-2 font-medium transition-colors ${isActive ? 'bg-white text-secondary' : 'text-white/90 hover:bg-white/15 hover:text-white'}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-white" />
              )}
            </button>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 space-y-3 pb-4"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                end={link.path === '/'}
                className={({ isActive }) => `block px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-white text-secondary' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                {link.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
