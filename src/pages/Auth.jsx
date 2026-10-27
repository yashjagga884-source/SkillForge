import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen, Check, Code2, Eye, EyeOff, GraduationCap, LockKeyhole, Mail, Sparkles, User } from 'lucide-react'
import { useDemoAuth } from '../context/DemoAuthContext'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function AuthLayout({ children, mode }) {
  return (
    <div className="auth-shell">
      <Link to="/" className="auth-brand"><span className="auth-brand-mark"><GraduationCap size={22} /></span><span>Skill<span>Forge</span></span></Link>
      <div className="auth-main">
        <aside className="auth-art" aria-label="SkillForge learning community">
          <div className="auth-art-orb orb-one" /><div className="auth-art-orb orb-two" />
          <div className="art-topline"><span className="art-live-dot" /> GOOD TO SEE YOU HERE</div>
          <div className="art-hero"><div className="art-icon"><Code2 size={28} /></div><h2>Learn something new.<br /><span>See where it takes you.</span></h2><p>Pick up a skill, explore a career, and take things one step at a time.</p></div>
          <div className="learning-card"><div className="learning-card-head"><span className="learning-icon"><BookOpen size={18} /></span><span>ONE STEP AT A TIME</span><Sparkles size={17} className="text-amber-300" /></div><div className="learning-path"><div className="path-line" /><div className="path-step done"><span><Check size={13} /></span><div><b>Find what interests you</b><small>Start with what you enjoy</small></div></div><div className="path-step current"><span>02</span><div><b>Pick up useful skills</b><small>Learn at your own pace</small></div></div><div className="path-step"><span>03</span><div><b>Try something new</b><small>Put what you learn to use</small></div></div></div></div>
          <div className="art-footer"><span>✦</span> Small steps count. Keep going.</div>
        </aside>
        <main className="auth-content"><div className="auth-card" key={mode}>{children}</div><p className="auth-footnote">A learning community demo by SkillForge</p></main>
      </div>
    </div>
  )
}

function Field({ id, label, type = 'text', value, onChange, error, placeholder, autoComplete, icon: Icon, trailing }) {
  return <div className="auth-field"><label htmlFor={id}>{label}</label><div className={`auth-input-wrap ${error ? 'has-error' : ''}`}>
    {Icon && <Icon size={17} className="field-icon" aria-hidden="true" />}
    <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />{trailing}
  </div>{error && <p className="field-error" id={`${id}-error`} role="alert">{error}</p>}</div>
}

function PasswordField({ id, label, value, onChange, error, autoComplete, strength }) {
  const [visible, setVisible] = useState(false)
  return <div><Field id={id} label={label} type={visible ? 'text' : 'password'} value={value} onChange={onChange} error={error} placeholder="At least 8 characters" autoComplete={autoComplete} icon={LockKeyhole} trailing={<button type="button" className="password-toggle" onClick={() => setVisible(!visible)} aria-label={visible ? 'Hide password' : 'Show password'}>{visible ? <EyeOff size={17} /> : <Eye size={17} />}</button>} />{strength && value && <div className="strength-wrap" aria-live="polite"><div className="strength-track"><span className={`strength-fill strength-${strength.level}`} /></div><span className={`strength-label strength-text-${strength.level}`}>{strength.label}</span></div>}</div>
}

function getPasswordStrength(password) {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (password.length < 8) return { level: 'low', label: 'Too short' }
  if (score <= 2) return { level: 'medium', label: 'Fair strength' }
  return { level: 'high', label: 'Strong password' }
}

function Alert({ children, kind = 'success' }) { return children ? <div className={`auth-alert alert-${kind}`} role="status">{children}</div> : null }

export function LoginPage() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState({}); const [busy, setBusy] = useState(false); const [message, setMessage] = useState('')
  const navigate = useNavigate(); const { login } = useDemoAuth()
  const submit = (event) => {
    event.preventDefault(); setMessage('')
    const next = {}
    if (!email.trim()) next.email = 'Please enter your email address.'
    else if (!emailPattern.test(email)) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Please enter your password.'
    setErrors(next)
    if (Object.keys(next).length) return
    setBusy(true)
    window.setTimeout(() => { login(email.trim()); setBusy(false); setMessage('You’re in! Taking you back to SkillForge…'); window.setTimeout(() => navigate('/'), 700) }, 650)
    void remember
  }
  return <AuthLayout mode="login"><div className="auth-eyebrow"><span className="eyebrow-spark">✦</span> READY WHEN YOU ARE</div><h1>Welcome back!</h1><p className="auth-subtitle">Pick up where you left off and keep learning at your own pace.</p><Alert>{message}</Alert>
    <form onSubmit={submit} noValidate className="auth-form"><Field id="login-email" label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="you@example.com" autoComplete="email" icon={Mail} /><PasswordField id="login-password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} autoComplete="current-password" />
      <div className="form-options"><label className="check-label"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /><span className="custom-check"><Check size={12} /></span>Remember me</label><Link to="/forgot-password" className="text-link">Forgot password?</Link></div>
      <button className="auth-submit" type="submit" disabled={busy}>{busy ? <><span className="spinner" /> Signing you in...</> : <>Log in <ArrowRight size={17} /></>}</button>
    </form><div className="auth-divider"><span />or<span /></div><p className="auth-switch">First time here? <Link to="/signup">Join SkillForge <ArrowRight size={14} /></Link></p><p className="demo-note"><span className="demo-note-dot" /> This is a demo. Any valid email and password will do.</p></AuthLayout>
}

export function SignupPage() {
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [confirm, setConfirm] = useState(''); const [terms, setTerms] = useState(false)
  const [errors, setErrors] = useState({}); const [busy, setBusy] = useState(false); const [message, setMessage] = useState('')
  const navigate = useNavigate(); const { signup } = useDemoAuth()
  const submit = (event) => {
    event.preventDefault(); setMessage('')
    const next = {}
    if (!name.trim()) next.name = 'Please enter your full name.'
    if (!email.trim()) next.email = 'Please enter your email address.'
    else if (!emailPattern.test(email)) next.email = 'Enter a valid email address.'
    if (password.length < 8) next.password = 'Use at least 8 characters.'
    if (!confirm) next.confirm = 'Please confirm your password.'
    else if (password !== confirm) next.confirm = 'Your passwords do not match.'
    if (!terms) next.terms = 'Please agree to continue.'
    setErrors(next)
    if (Object.keys(next).length) return
    setBusy(true)
    window.setTimeout(() => { signup(name.trim(), email.trim()); setBusy(false); setMessage('You’re all set! Welcome to SkillForge.'); window.setTimeout(() => navigate('/'), 900) }, 650)
  }
  return <AuthLayout mode="signup"><div className="auth-eyebrow"><span className="eyebrow-spark">✦</span> LET’S GET YOU STARTED</div><h1>Join SkillForge</h1><p className="auth-subtitle">Create an account and make this space yours.</p><Alert>{message}</Alert>
    <form onSubmit={submit} noValidate className="auth-form signup-form"><Field id="signup-name" label="Full name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} placeholder="Your name" autoComplete="name" icon={User} /><Field id="signup-email" label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="you@example.com" autoComplete="email" icon={Mail} /><PasswordField id="signup-password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} autoComplete="new-password" strength={getPasswordStrength(password)} /><PasswordField id="signup-confirm" label="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} autoComplete="new-password" />
      <div><label className="check-label terms-check"><input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} aria-describedby={errors.terms ? 'terms-error' : undefined} /><span className="custom-check"><Check size={12} /></span><span>I agree to the <a href="#terms" onClick={(e) => e.preventDefault()}>Terms &amp; Conditions</a></span></label>{errors.terms && <p className="field-error" id="terms-error" role="alert">{errors.terms}</p>}</div>
      <button className="auth-submit" type="submit" disabled={busy}>{busy ? <><span className="spinner" /> Creating your account...</> : <>Create account <ArrowRight size={17} /></>}</button>
    </form><p className="auth-switch signup-switch">Already with us? <Link to="/login">Log in <ArrowRight size={14} /></Link></p><p className="demo-note"><span className="demo-note-dot" /> This is just a demo. Your password isn’t saved.</p></AuthLayout>
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState(''); const [error, setError] = useState(''); const [sent, setSent] = useState(false); const [busy, setBusy] = useState(false)
  const submit = (event) => { event.preventDefault(); if (!emailPattern.test(email)) { setError('Enter a valid email address.'); return } setError(''); setBusy(true); window.setTimeout(() => { setBusy(false); setSent(true) }, 600) }
  return <AuthLayout mode="forgot"><Link to="/login" className="back-link"><ArrowLeft size={15} /> Back to log in</Link><div className="forgot-icon"><Mail size={23} /></div><div className="auth-eyebrow">NEED A HAND?</div><h1>Forgot your password?</h1><p className="auth-subtitle">Add your email below and we’ll confirm your request. This demo won’t send an email.</p>{sent ? <Alert kind="info">Got it! We’ve noted the request for <strong>{email}</strong>. Since this is a demo, no email was sent.</Alert> : <form className="auth-form forgot-form" onSubmit={submit} noValidate><Field id="reset-email" label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={error} placeholder="you@example.com" autoComplete="email" icon={Mail} /><button className="auth-submit" type="submit" disabled={busy}>{busy ? <><span className="spinner" /> One moment...</> : <>Continue <ArrowRight size={17} /></>}</button><p className="demo-note"><span className="demo-note-dot" /> Just a demo — no email will be sent.</p></form>}</AuthLayout>
}
