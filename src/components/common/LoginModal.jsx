import { useEffect, useRef, useState } from 'react'
import { Eye, EyeOff, LogIn, Mail, UserPlus, X } from 'lucide-react'
import './LoginModal.css'

const REMEMBERED_EMAIL_KEY = 'skillforge-remembered-email'
function getRememberedEmail() {
  try {
    return window.localStorage.getItem(REMEMBERED_EMAIL_KEY) || ''
  } catch {
    return ''
  }
}

export function LoginModal({ accounts, demoAccount, onClose, onRegister, onSignIn }) {
  const [email, setEmail] = useState(getRememberedEmail)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(Boolean(getRememberedEmail()))
  const [showPassword, setShowPassword] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const emailInputRef = useRef(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    emailInputRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      document.querySelector('[data-login-trigger]')?.focus()
    }
  }, [onClose])

  const validateForm = () => {
    const nextErrors = {}
    const normalizedEmail = email.trim()

    if (!normalizedEmail) {
      nextErrors.email = 'Enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!password) {
      nextErrors.password = 'Enter your password.'
    } else if (password.length < 8) {
      nextErrors.password = 'Your password must be at least 8 characters.'
    }

    if (isRegistering && confirmPassword !== password) {
      nextErrors.confirmPassword = 'The passwords do not match.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')

    if (!validateForm()) return

    setIsSubmitting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 400))
    setIsSubmitting(false)

    const normalizedEmail = email.trim().toLowerCase()

    if (isRegistering) {
      const emailAlreadyRegistered = accounts.some((account) => account.email.toLowerCase() === normalizedEmail)

      if (emailAlreadyRegistered) {
        setMessage('An account with this email already exists. Sign in instead.')
        return
      }

      onRegister({ email: normalizedEmail, password })
      setEmail(normalizedEmail)
      setPassword('')
      setConfirmPassword('')
      setIsRegistering(false)
      setMessage('Account created for this session. Sign in with your new details.')
      return
    }

    const account = accounts.find((savedAccount) => (
      savedAccount.email.toLowerCase() === normalizedEmail && savedAccount.password === password
    ))

    if (!account) {
      setMessage('Those details do not match an account in this session. Check them and try again.')
      return
    }

    try {
      if (rememberMe) {
        window.localStorage.setItem(REMEMBERED_EMAIL_KEY, email.trim())
      } else {
        window.localStorage.removeItem(REMEMBERED_EMAIL_KEY)
      }
    } catch {
      // Remembering the email is optional when browser storage is unavailable.
    }

    onSignIn(email.trim())
  }

  const switchFormMode = () => {
    setIsRegistering((registering) => !registering)
    setErrors({})
    setMessage('')
    setPassword('')
    setConfirmPassword('')
    setShowPassword(false)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    setErrors((currentErrors) => ({ ...currentErrors, email: '' }))
    setMessage('')
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    setErrors((currentErrors) => ({ ...currentErrors, password: '', confirmPassword: '' }))
    setMessage('')
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
    setErrors((currentErrors) => ({ ...currentErrors, confirmPassword: '' }))
    setMessage('')
  }

  return (
    <div className="login-modal-overlay">
      <section
        className="login-shell"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-heading"
      >
        <button
          className="login-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close login dialog"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="login-welcome">
          <h1 id="login-heading">Welcome back.</h1>
          <p className="login-welcome-copy">
            Pick up where you left off and keep building the skills that move your career forward.
          </p>
          <p className="login-promise">Your next opportunity starts with one step.</p>
        </div>

        <div className="login-card-wrap">
          <form className="login-card" onSubmit={handleSubmit} noValidate>
            <div className="login-card-heading">
              <p className="login-eyebrow">YOUR LEARNING JOURNEY</p>
              <h2>{isRegistering ? 'Create your account' : 'Sign in to your account'}</h2>
              <p>{isRegistering ? 'Register to start your learning journey.' : 'Enter your details below to continue.'}</p>
            </div>


            <div className="login-field">
              <label htmlFor="login-email">Email address</label>
              <div className={`login-input-wrap${errors.email ? ' has-error' : ''}`}>
                <Mail size={18} aria-hidden="true" />
                <input
                  ref={emailInputRef}
                  id="login-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'login-email-error' : undefined}
                />
              </div>
              {errors.email && <p className="login-field-error" id="login-email-error">{errors.email}</p>}
            </div>

            <div className="login-field">
              <label htmlFor="login-password">Password</label>
              <div className={`login-input-wrap${errors.password ? ' has-error' : ''}`}>
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="At least 8 characters"
                  autoComplete={isRegistering ? 'new-password' : 'current-password'}
                  required
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'login-password-error' : undefined}
                />
                <button
                  className="login-password-toggle"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
              </div>
              {errors.password && <p className="login-field-error" id="login-password-error">{errors.password}</p>}
            </div>

            {isRegistering && (
              <div className="login-field">
                <label htmlFor="login-confirm-password">Confirm password</label>
                <div className={`login-input-wrap${errors.confirmPassword ? ' has-error' : ''}`}>
                  <input
                    id="login-confirm-password"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    required
                    aria-invalid={Boolean(errors.confirmPassword)}
                    aria-describedby={errors.confirmPassword ? 'login-confirm-password-error' : undefined}
                  />
                </div>
                {errors.confirmPassword && <p className="login-field-error" id="login-confirm-password-error">{errors.confirmPassword}</p>}
              </div>
            )}

            {!isRegistering && (
              <div className="login-options">
                <label className="login-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  <span>Remember my email</span>
                </label>
              </div>
            )}

            {message && <p className="login-form-message" role="alert">{message}</p>}

            <button className="login-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Checking details…' : isRegistering ? <><UserPlus size={17} aria-hidden="true" /> Create account</> : <><LogIn size={17} aria-hidden="true" /> Sign in</>}
            </button>

            <p className="login-register-note">
              {isRegistering ? 'Already registered?' : 'New to SkillForge-AI?'}{' '}
              <button className="login-mode-toggle" type="button" onClick={switchFormMode}>
                {isRegistering ? 'Sign in' : 'Create an account'}
              </button>
            </p>
          </form>

        </div>
      </section>
    </div>
  )
}
