import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock3, GraduationCap, Search, Trophy, XCircle } from 'lucide-react'
import { QUIZZES } from '../constants/quizzes'
import { useLocalStorage } from '../hooks/useLocalStorage'

const STORAGE_KEY = 'skillforge-quiz-history'
const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

function QuizCard({ quiz, attempts, onStart }) {
  const best = attempts.filter((attempt) => attempt.quizId === quiz.id).reduce((max, attempt) => Math.max(max, attempt.percentage), 0)
  return (
    <article className="card card-hover flex flex-col p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-secondary dark:text-accent">{quiz.category}</span>
        <span className="text-sm text-slate-500 dark:text-slate-300">{quiz.difficulty}</span>
      </div>
      <h2 className="mb-2 text-xl">{quiz.title}</h2>
      <p className="mb-5 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{quiz.description}</p>
      <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-300">
        <span className="inline-flex items-center gap-1.5"><Clock3 size={16} />{quiz.duration} min</span>
        <span className="inline-flex items-center gap-1.5"><BookOpen size={16} />{quiz.questions.length} questions</span>
        {best > 0 && <span className="inline-flex items-center gap-1.5 text-secondary dark:text-accent"><Trophy size={16} />Best {best}%</span>}
      </div>
      <button className="btn-primary w-full" onClick={() => onStart(quiz)}>Start Quiz <ArrowRight className="ml-2 inline" size={17} /></button>
    </article>
  )
}

function QuizSetup({ quiz, onStart, onCancel }) {
  const [duration, setDuration] = useState(String(quiz.duration))
  const [error, setError] = useState('')
  const submit = (event) => {
    event.preventDefault()
    const minutes = Number(duration)
    if (!Number.isFinite(minutes) || minutes < 1 || minutes > 60) return setError('Choose a time between 1 and 60 minutes.')
    onStart(minutes * 60)
  }
  return <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/60 p-4" role="presentation">
    <form onSubmit={submit} className="card w-full max-w-md p-6" role="dialog" aria-modal="true" aria-labelledby="setup-title">
      <h2 id="setup-title" className="mb-2 text-2xl">Set up your quiz</h2><p className="mb-5 text-slate-600 dark:text-slate-300">{quiz.title} · {quiz.questions.length} questions</p>
      <label className="mb-2 block font-medium" htmlFor="quiz-duration">Time limit (minutes)</label>
      <input id="quiz-duration" className="input-field" type="number" min="1" max="60" value={duration} onChange={(event) => { setDuration(event.target.value); setError('') }} />
      {error && <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>}
      <div className="mt-6 flex justify-end gap-3"><button type="button" className="btn-outline" onClick={onCancel}>Cancel</button><button className="btn-primary" type="submit">Begin quiz</button></div>
    </form>
  </div>
}

function QuizPlayer({ quiz, seconds, onExit, onFinish }) {
  const [remaining, setRemaining] = useState(seconds)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState(() => Array(quiz.questions.length).fill(null))
  const submitted = useRef(false)
  const startedAt = useRef(Date.now())
  const question = quiz.questions[index]
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [])
  useEffect(() => {
    if (remaining === 0 && !submitted.current) {
      submitted.current = true
      onFinish(answers, Math.max(0, seconds - remaining), true)
    }
  }, [remaining, answers, onFinish, seconds])
  const finish = () => {
    if (submitted.current) return
    submitted.current = true
    onFinish(answers, Math.max(0, Math.floor((Date.now() - startedAt.current) / 1000)), false)
  }
  const progress = ((index + 1) / quiz.questions.length) * 100
  return <section className="mx-auto max-w-3xl" aria-label="Quiz player">
    <div className="mb-6 flex items-center justify-between gap-3"><button className="btn-outline !px-4 !py-2" onClick={onExit}><ArrowLeft className="mr-2 inline" size={16} />Exit quiz</button><div className={`flex items-center gap-2 rounded-full px-4 py-2 font-semibold ${remaining < 60 ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-200' : 'bg-primary/10 text-secondary dark:text-accent'}`} aria-live="polite"><Clock3 size={17} />{formatTime(remaining)}</div></div>
    <div className="card p-5 sm:p-8">
      <div className="mb-6 flex items-center justify-between text-sm text-slate-500 dark:text-slate-300"><span>{quiz.title}</span><span>Question {index + 1} of {quiz.questions.length}</span></div>
      <div className="mb-7 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700" role="progressbar" aria-valuenow={index + 1} aria-valuemin="1" aria-valuemax={quiz.questions.length} aria-label="Quiz progress"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div>
      <h1 className="mb-6 text-2xl sm:text-3xl">{question.prompt}</h1>
      <div className="space-y-3" role="radiogroup" aria-label="Answer choices">{question.options.map((option, optionIndex) => {
        const selected = answers[index] === optionIndex
        return <button key={option} role="radio" aria-checked={selected} onClick={() => setAnswers((current) => current.map((value, itemIndex) => itemIndex === index ? optionIndex : value))} className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors ${selected ? 'border-primary bg-primary/10 text-secondary dark:text-accent' : 'border-slate-200 hover:border-primary/50 dark:border-dark-border'}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-sm font-semibold ${selected ? 'border-primary bg-primary text-white' : 'border-slate-300 dark:border-slate-500'}`}>{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span></button>
      })}</div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3"><button className="btn-outline !px-4 !py-2" disabled={index === 0} onClick={() => setIndex((value) => value - 1)}><ArrowLeft className="mr-2 inline" size={16} />Previous</button><span className="text-sm text-slate-500 dark:text-slate-300">{answers.filter((answer) => answer !== null).length} answered</span>{index < quiz.questions.length - 1 ? <button className="btn-primary !px-4 !py-2" onClick={() => setIndex((value) => value + 1)}>Next <ArrowRight className="ml-2 inline" size={16} /></button> : <button className="btn-primary !px-4 !py-2" onClick={finish}>Submit Quiz</button>}</div>
    </div>
  </section>
}

function QuizResults({ result, quiz, onRetake, onAnother, onDashboard }) {
  const correct = result.answers.filter((answer, index) => answer === quiz.questions[index].answer).length
  const percentage = Math.round((correct / quiz.questions.length) * 100)
  const message = percentage === 100 ? 'Perfect score! You’ve mastered this topic.' : percentage >= 70 ? 'Great work! You have a strong understanding.' : percentage >= 40 ? 'Good effort. Review the explanations and try again.' : 'Every attempt is progress. Keep learning and try again.'
  return <section className="mx-auto max-w-4xl space-y-7">
    <div className="card overflow-hidden text-center"><div className="bg-gradient-to-r from-[#0B3B70] to-secondary px-6 py-8 text-white"><Trophy className="mx-auto mb-3" size={36} /><p className="mb-1 text-white/80">Quiz complete</p><h1 className="text-3xl">{quiz.title}</h1></div><div className="p-6 sm:p-8"><p className="mb-6 text-lg text-slate-600 dark:text-slate-300">{message}</p><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{[['Score', `${correct}/${quiz.questions.length}`], ['Percentage', `${percentage}%`], ['Correct', correct], ['Incorrect', quiz.questions.length - correct], ['Time taken', formatTime(result.elapsed)]].map(([label, value]) => <div className="rounded-xl bg-primary/5 p-4 dark:bg-white/5" key={label}><p className="text-2xl font-bold text-secondary dark:text-accent">{value}</p><p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{label}</p></div>)}</div><div className="mt-7 flex flex-wrap justify-center gap-3"><button className="btn-primary" onClick={onRetake}>Retake Quiz</button><button className="btn-outline" onClick={onAnother}>Try Another Quiz</button><button className="btn-outline" onClick={onDashboard}>Return to Quiz Dashboard</button></div>{result.expired && <p className="mt-4 text-sm text-slate-500">Time expired; your quiz was submitted automatically.</p>}</div></div>
    <div><h2 className="mb-4 text-2xl">Question review</h2><div className="space-y-4">{quiz.questions.map((item, index) => { const isCorrect = result.answers[index] === item.answer; return <article className="card p-5" key={item.prompt}><div className="mb-2 flex items-start gap-2">{isCorrect ? <CheckCircle2 className="mt-1 shrink-0 text-emerald-600" size={19} /> : <XCircle className="mt-1 shrink-0 text-red-500" size={19} />}<h3 className="text-lg">{index + 1}. {item.prompt}</h3></div><p className="mb-1 text-sm text-slate-600 dark:text-slate-300">Your answer: {result.answers[index] === null ? 'Not answered' : item.options[result.answers[index]]}</p><p className="mb-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">Correct answer: {item.options[item.answer]}</p><p className="text-sm text-slate-500 dark:text-slate-300">{item.explanation}</p></article> })}</div></div>
  </section>
}

export function Quizzes() {
  const [params, setParams] = useSearchParams()
  const [attempts, setAttempts] = useLocalStorage(STORAGE_KEY, [])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All categories')
  const [difficulty, setDifficulty] = useState('All levels')
  const [setupQuiz, setSetupQuiz] = useState(null)
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [activeSeconds, setActiveSeconds] = useState(0)
  const [result, setResult] = useState(null)
  const categories = useMemo(() => ['All categories', ...new Set(QUIZZES.map((quiz) => quiz.category))], [])
  const filtered = useMemo(() => QUIZZES.filter((quiz) => `${quiz.title} ${quiz.description} ${quiz.category}`.toLowerCase().includes(query.toLowerCase()) && (category === 'All categories' || quiz.category === category) && (difficulty === 'All levels' || quiz.difficulty === difficulty)), [query, category, difficulty])
  const selectedQuiz = QUIZZES.find((quiz) => quiz.id === params.get('quiz'))

  const begin = (quiz, seconds = quiz.duration * 60) => {
    setSetupQuiz(null); setResult(null); setActiveQuiz(quiz); setActiveSeconds(seconds)
    setParams({ quiz: quiz.id, play: '1' })
  }
  const finish = (answers, elapsed, expired) => {
    if (!activeQuiz || result) return
    const correct = answers.filter((answer, index) => answer === activeQuiz.questions[index].answer).length
    const attempt = { id: `${Date.now()}`, quizId: activeQuiz.id, title: activeQuiz.title, answers, score: correct, total: activeQuiz.questions.length, percentage: Math.round(correct / activeQuiz.questions.length * 100), elapsed, completedAt: new Date().toISOString(), expired }
    setAttempts((current) => [attempt, ...current].slice(0, 100))
    setActiveQuiz(null); setResult(attempt); setParams({ quiz: activeQuiz.id, result: attempt.id })
  }
  const toDashboard = () => { setResult(null); setActiveQuiz(null); setSetupQuiz(null); setParams({}) }
  const exit = () => { if (window.confirm('Exit this quiz? Your answers will be lost and no score will be saved.')) toDashboard() }
  const another = () => { toDashboard(); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const shownResult = result || (params.get('result') ? attempts.find((attempt) => attempt.id === params.get('result')) : null)
  const resultQuiz = QUIZZES.find((quiz) => quiz.id === (shownResult?.quizId || params.get('quiz')))

  if (activeQuiz) return <QuizPlayer key={activeQuiz.id} quiz={activeQuiz} seconds={activeSeconds} onExit={exit} onFinish={finish} />
  if (shownResult && resultQuiz) return <QuizResults result={shownResult} quiz={resultQuiz} onRetake={() => begin(resultQuiz)} onAnother={another} onDashboard={toDashboard} />
  if (selectedQuiz && !setupQuiz) return <div className="mx-auto max-w-xl py-16 text-center"><div className="card p-8"><GraduationCap className="mx-auto mb-4 text-primary" size={42} /><h1 className="mb-3 text-2xl">Ready to begin?</h1><p className="mb-6 text-slate-600 dark:text-slate-300">{selectedQuiz.title} is ready. Your selected answers are held for this session. Refreshing this page ends the active quiz.</p><button className="btn-primary" onClick={() => begin(selectedQuiz)}>Start Quiz</button><button className="ml-3 btn-outline" onClick={toDashboard}>Dashboard</button></div></div>

  return <div className="space-y-9">
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B3B70] via-[#1559a0] to-secondary px-6 py-12 text-center text-white shadow-lg sm:px-12 sm:py-16"><div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[36px] border-white/10" /><div className="relative mx-auto max-w-2xl"><h1 className="mb-4 text-4xl sm:text-5xl">Learn, Challenge, Achieve.</h1><p className="mx-auto max-w-xl text-base leading-7 text-blue-50 sm:text-lg">Test what you know, uncover what’s next, and build practical skills one quick quiz at a time.</p></div></section>
    <section className="grid grid-cols-2 gap-4 md:grid-cols-4" aria-label="Quiz progress summary">{[['Attempts', attempts.length], ['Completed quizzes', new Set(attempts.map((attempt) => attempt.quizId)).size], ['Best score', `${attempts.length ? Math.max(...attempts.map((attempt) => attempt.percentage)) : 0}%`], ['Quiz library', QUIZZES.length]].map(([label, value]) => <div className="card p-4 sm:p-5" key={label}><p className="text-2xl font-bold text-secondary dark:text-accent">{value}</p><p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{label}</p></div>)}</section>
    <section><div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><h2 className="section-heading !mb-1">Choose your next challenge</h2><p className="text-slate-500 dark:text-slate-300">Explore quick checks across technology, learning, and career skills.</p></div><div className="relative w-full md:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input className="input-field !pl-10" placeholder="Search quizzes..." value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search quizzes" /></div></div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row"><label className="sr-only" htmlFor="quiz-category">Filter by category</label><select className="input-field sm:max-w-xs" id="quiz-category" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select><label className="sr-only" htmlFor="quiz-difficulty">Filter by difficulty</label><select className="input-field sm:max-w-xs" id="quiz-difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option>All levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div>
      {filtered.length ? <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} attempts={attempts} onStart={setSetupQuiz} />)}</div> : <div className="card p-10 text-center text-slate-500">No quizzes match those filters. Try another search.</div>}
    </section>
    <section className="card p-5 sm:p-7"><div className="mb-4 flex items-center justify-between gap-3"><div><h2 className="text-2xl">Recent attempts</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Your progress is stored locally in this browser.</p></div><BookOpen className="text-primary" /></div>{attempts.length ? <div className="divide-y divide-slate-200 dark:divide-dark-border">{attempts.slice(0, 5).map((attempt) => <div key={attempt.id} className="flex flex-wrap items-center justify-between gap-2 py-3"><div><p className="font-medium">{attempt.title}</p><p className="text-xs text-slate-500 dark:text-slate-300">{new Date(attempt.completedAt).toLocaleString()}</p></div><span className="font-semibold text-secondary dark:text-accent">{attempt.score}/{attempt.total} · {attempt.percentage}%</span></div>)}</div> : <p className="py-4 text-sm text-slate-500 dark:text-slate-300">No attempts yet. Start a quiz to see your progress here.</p>}</section>
    {setupQuiz && <QuizSetup quiz={setupQuiz} onCancel={() => setSetupQuiz(null)} onStart={(seconds) => begin(setupQuiz, seconds)} />}
  </div>
}
