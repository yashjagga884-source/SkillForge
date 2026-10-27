import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, RotateCcw } from 'lucide-react'
import { QUIZZES } from '../constants/quizzes'

export function Quizzes() {
  const [secondsLeft, setSecondsLeft] = useState(300)
  const [quiz, setQuiz] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [finalScore, setFinalScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const startQuiz = (selectedQuiz) => {
    setQuiz(selectedQuiz)
    setQuestionIndex(0)
    setAnswer(null)
    setScore(0)
    setFinalScore(0)
    setFinished(false)
    setSecondsLeft(300)
  }

  useEffect(() => {
    if (!quiz || finished || secondsLeft === 0) return
    const timer = window.setInterval(() => setSecondsLeft((seconds) => Math.max(0, seconds - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [quiz, finished, secondsLeft])

  useEffect(() => {
    if (!quiz || finished || secondsLeft !== 0) return
    const currentQuestion = quiz.questions[questionIndex]
    setFinalScore(score + (answer === currentQuestion.answer ? 1 : 0))
    setFinished(true)
  }, [quiz, finished, secondsLeft, questionIndex, score, answer])

  const nextQuestion = () => {
    if (answer === quiz.questions[questionIndex].answer) setScore((value) => value + 1)
    if (questionIndex === quiz.questions.length - 1) {
      setFinalScore(score + (answer === quiz.questions[questionIndex].answer ? 1 : 0))
      setFinished(true)
    }
    else {
      setQuestionIndex((value) => value + 1)
      setAnswer(null)
    }
  }

  if (!quiz) {
    return (
      <main className="mx-auto max-w-5xl space-y-8">
        <header className="text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Quick practice</p>
          <h1 className="section-heading">Choose a quiz</h1>
          <p className="text-slate-600 dark:text-slate-300">Pick a topic and test what you know.</p>
        </header>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Available quizzes">
          {QUIZZES.map((item) => (
            <article className="card flex flex-col p-6" key={item.id}>
              <span className="mb-3 text-sm font-medium text-secondary dark:text-accent">{item.category}</span>
              <h2 className="mb-2 text-xl">{item.title}</h2>
              <p className="mb-5 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
              <p className="mb-4 text-sm text-slate-500 dark:text-slate-300">{item.questions.length} questions</p>
              <button className="btn-primary w-full" onClick={() => startQuiz(item)}>Start quiz</button>
            </article>
          ))}
        </section>
      </main>
    )
  }

  if (finished) {
    return (
      <section className="card mx-auto max-w-xl p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 text-emerald-600" size={44} />
        <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-300">{secondsLeft === 0 ? "Time's up" : 'Quiz complete'}</p>
        <h1 className="mb-3 text-3xl">{quiz.title}</h1>
        <p className="mb-6 text-lg">You got <strong>{finalScore} out of {quiz.questions.length}</strong> correct.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button className="btn-primary" onClick={() => startQuiz(quiz)}><RotateCcw className="mr-2 inline" size={16} />Try again</button>
          <button className="btn-outline" onClick={() => setQuiz(null)}>Choose another quiz</button>
        </div>
      </section>
    )
  }

  const question = quiz.questions[questionIndex]
  const isCorrect = answer === question.answer

  return (
    <section className="mx-auto max-w-2xl">
      <button className="mb-5 inline-flex items-center text-sm text-slate-600 hover:text-primary dark:text-slate-300" onClick={() => setQuiz(null)}>
        <ArrowLeft className="mr-2" size={16} />All quizzes
      </button>
      <div className="card p-6 sm:p-8">
        <div className="mb-5 flex items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-300">
          <span>{quiz.title}</span>
          <span className={`inline-flex items-center gap-1.5 font-semibold ${secondsLeft <= 30 ? 'text-red-600 dark:text-red-300' : ''}`} aria-live="polite">
            <Clock3 size={16} />{Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
          </span>
          <span>{questionIndex + 1} / {quiz.questions.length}</span>
        </div>
        <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700" aria-label="Quiz progress">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((questionIndex + 1) / quiz.questions.length) * 100}%` }} />
        </div>
        <h1 className="mb-6 text-2xl">{question.prompt}</h1>
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const selected = answer === index
            const correctChoice = answer !== null && index === question.answer
            const wrongChoice = selected && !isCorrect
            return (
              <button
                key={option}
                disabled={answer !== null}
                onClick={() => setAnswer(index)}
                className={`w-full rounded-xl border p-4 text-left transition-colors ${correctChoice ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200' : wrongChoice ? 'border-red-400 bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-200' : selected ? 'border-primary bg-primary/10' : 'border-slate-200 hover:border-primary/50 dark:border-dark-border'}`}
              >
                {option}
              </button>
            )
          })}
        </div>
        {answer !== null && (
          <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm dark:bg-white/5" role="status">
            <p className="font-semibold">{isCorrect ? 'That’s right!' : `Correct answer: ${question.options[question.answer]}`}</p>
            {question.explanation && <p className="mt-1 text-slate-600 dark:text-slate-300">{question.explanation}</p>}
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <button className="btn-primary" disabled={answer === null} onClick={nextQuestion}>
            {questionIndex === quiz.questions.length - 1 ? 'See score' : 'Next question'} <ArrowRight className="ml-2 inline" size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}

