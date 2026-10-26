import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Moon, Sun, Sparkles } from '../common/Icons'
import { motion } from '../common/StaticMotion'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Careers', path: '/careers' },
  { label: 'Technologies', path: '/technologies' },
  { label: 'Quizzes', path: '/quizzes' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export function Navbar({ isDark, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-dark-border dark:bg-dark-bg/85">
      <div className="container mx-auto max-w-7xl px-4 py-3 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold font-poppins transition-opacity hover:opacity-80">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-indigo-500/25">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline text-ink dark:text-white">SkillForge<span className="text-primary">AI</span></span>
          </Link>

          <div className="hidden items-center gap-1 rounded-xl bg-slate-100/80 p-1 dark:bg-dark-card md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-white text-primary shadow-sm dark:bg-dark-border dark:text-white' : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white'}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:text-primary dark:border-dark-border dark:bg-dark-card dark:text-slate-300" aria-label="Toggle theme">
              {isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-primary" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="rounded-xl border border-slate-200 bg-white p-2 dark:border-dark-border dark:bg-dark-card md:hidden" aria-label="Toggle menu">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.2 }} className="mt-4 space-y-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg dark:border-dark-border dark:bg-dark-card md:hidden">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={({ isActive }) => `block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-indigo-50 text-primary dark:bg-dark-border dark:text-white' : 'text-slate-700 hover:bg-indigo-50 hover:text-primary dark:text-slate-200 dark:hover:bg-dark-border'}`}>
                {link.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
