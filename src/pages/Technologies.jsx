import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { BookOpen, Check, Clock3, Search } from 'lucide-react'
import { TECHNOLOGIES } from '../constants/data'

export function Technologies() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedId = Number(searchParams.get('skill')) || TECHNOLOGIES[0].id
  const selectedTech = TECHNOLOGIES.find((tech) => tech.id === selectedId) || TECHNOLOGIES[0]
  const filteredTechs = useMemo(() => TECHNOLOGIES.filter((tech) => (
    `${tech.name} ${tech.description} ${tech.category}`.toLowerCase().includes(searchTerm.toLowerCase())
  )), [searchTerm])

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8">
      <header className="mx-auto max-w-2xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-primary">Explore and learn</p>
        <h1 className="section-heading">Choose a technology</h1>
        <p className="mx-auto max-w-xl text-slate-600 dark:text-slate-300">Select a topic to see what it is, how long it may take to learn, and where to start.</p>
      </header>

      <div className="relative mx-auto max-w-2xl">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input className="input-field !pl-11" type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search technologies..." aria-label="Search technologies" />
      </div>

      {filteredTechs.length ? (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(250px,0.8fr)_minmax(0,1.5fr)]">
          <section aria-label="Technology list" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
            {filteredTechs.map((tech) => (
              <button
                type="button"
                key={tech.id}
                onClick={() => setSearchParams({ skill: String(tech.id) })}
                aria-pressed={selectedTech.id === tech.id}
                className={`flex min-h-16 items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${selectedTech.id === tech.id ? 'border-primary bg-primary/5 text-primary dark:bg-primary/10' : 'border-slate-200 bg-white hover:border-primary/40 dark:border-dark-border dark:bg-dark-card'}`}
              >
                <span className="text-2xl" aria-hidden="true">{tech.icon}</span>
                <span className="text-sm font-semibold">{tech.name}</span>
              </button>
            ))}
          </section>

          <article className="card p-6 sm:p-8" aria-live="polite">
            <div className="flex items-start gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-primary/10 text-3xl" aria-hidden="true">{selectedTech.icon}</span>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{selectedTech.category}</p>
                <h2 className="mt-1 text-3xl font-semibold">{selectedTech.name}</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-300">{selectedTech.description}</p>
              </div>
            </div>

            <div className="mt-7 grid gap-4 rounded-lg bg-slate-50 p-4 sm:grid-cols-2 dark:bg-dark-bg">
              <div className="flex items-center gap-3"><BookOpen size={19} className="text-primary" aria-hidden="true" /><div><p className="text-xs text-slate-500 dark:text-slate-400">Starting level</p><p className="font-medium">{selectedTech.level}</p></div></div>
              <div className="flex items-center gap-3"><Clock3 size={19} className="text-primary" aria-hidden="true" /><div><p className="text-xs text-slate-500 dark:text-slate-400">Suggested learning time</p><p className="font-medium">{selectedTech.learningTime}</p></div></div>
            </div>

            <div className="mt-7">
              <h3 className="font-semibold">Useful for these career paths</h3>
              <div className="mt-3 flex flex-wrap gap-2">{selectedTech.relatedCareers.map((career) => <span key={career} className="rounded-full bg-primary/10 px-3 py-1.5 text-sm text-primary">{career}</span>)}</div>
            </div>

            <div className="mt-7">
              <h3 className="font-semibold">Places to start</h3>
              <ul className="mt-3 space-y-2">{selectedTech.resources.map((resource) => <li key={resource} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><Check size={16} className="text-primary" aria-hidden="true" />{resource}</li>)}</ul>
            </div>

            <Link to="/pricing" className="btn-primary mt-8 inline-flex w-full items-center justify-center sm:w-auto">Subscribe</Link>
          </article>
        </div>
      ) : (
        <div className="card p-10 text-center">
          <p className="text-slate-600 dark:text-slate-300">No technologies match “{searchTerm}”.</p>
          <button className="btn-outline mt-4" onClick={() => setSearchTerm('')}>Clear search</button>
        </div>
      )}
    </div>
  )
}
