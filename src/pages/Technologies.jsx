import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { BookOpen, Check, CheckCircle, Clock3, Search } from 'lucide-react'
import { TECHNOLOGIES } from '../constants/data'
import { useLocalStorage } from '../hooks/useLocalStorage'

const topicGroups = {
  'Web development': ['JavaScript', 'React', 'Node.js', 'TypeScript', 'HTML', 'CSS'],
  'Data & AI': ['MongoDB', 'Python', 'Machine Learning', 'SQL'],
  'Cloud & DevOps': ['Docker', 'AWS', 'Kubernetes'],
  Design: ['Figma'],
}

const lessons = {
  React: {
    use: 'React is used to build the interactive parts of SkillForge, such as reusable cards, filters, and detail panels.',
    example: 'function Welcome() {\n  return <h1>Hello, learner!</h1>\n}',
    activity: 'Change the heading to a greeting you would use on your own learning dashboard.',
  },
  JavaScript: {
    use: 'JavaScript handles interactions such as searching topics, selecting a technology, and updating what appears on screen.',
    example: 'const topic = "React"\nconsole.log(`Let’s learn ${topic}`)',
    activity: 'Change the topic to a technology you want to explore, then read the message aloud.',
  },
  HTML: {
    use: 'HTML gives each SkillForge page its structure: headings, links, forms, cards, and learning details.',
    example: '<article>\n  <h2>My learning goal</h2>\n  <p>Build a small project.</p>\n</article>',
    activity: 'Add another paragraph that describes one thing you want to learn.',
  },
  CSS: {
    use: 'CSS controls the look of SkillForge, from spacing and colors to card layouts that adapt to smaller screens.',
    example: '.topic-card {\n  padding: 1rem;\n  border-radius: 12px;\n}',
    activity: 'Try changing the padding or corner radius to make the card feel more spacious.',
  },
  'Node.js': {
    use: 'Node.js can power a SkillForge server that handles accounts, saved progress, and course data.',
    example: 'const message = "Course saved"\nconsole.log(message)',
    activity: 'Change the message to describe a different action a learning app might save.',
  },
  MongoDB: {
    use: 'MongoDB can store flexible records such as learning plans, saved topics, and course progress.',
    example: '{\n  learner: "Sam",\n  completedTopics: ["HTML", "CSS"]\n}',
    activity: 'Add one more technology to the completedTopics list.',
  },
  Python: {
    use: 'Python is often used for data tools and recommendation services that could support learning suggestions.',
    example: 'topics = ["HTML", "CSS"]\nprint(len(topics))',
    activity: 'Add another topic to the list and update the code to count the items.',
  },
  Docker: {
    use: 'Docker packages an app and its setup so a SkillForge development environment can run consistently.',
    example: 'FROM node:20\nWORKDIR /app\nCOPY . .',
    activity: 'Identify which line chooses the starting environment for this container.',
  },
  AWS: {
    use: 'AWS provides cloud services where a learning platform can host its website, files, and APIs.',
    example: 'Website → Cloud hosting\nCourse files → Object storage',
    activity: 'Match one part of an app—website, files, or API—to a cloud service it might need.',
  },
  'Machine Learning': {
    use: 'Machine learning can help a learning platform suggest topics based on goals and past activity.',
    example: 'past topics + learning goal\n→ suggested next topic',
    activity: 'Choose one signal that could make a topic recommendation more useful.',
  },
  TypeScript: {
    use: 'TypeScript adds clear data types to JavaScript, helping larger SkillForge features stay easier to maintain.',
    example: 'type Topic = { name: string }\nconst next: Topic = { name: "React" }',
    activity: 'Change the topic name while keeping it as text inside the quotes.',
  },
  SQL: {
    use: 'SQL can query structured records such as courses, learner accounts, or completion history.',
    example: 'SELECT name\nFROM courses\nWHERE level = \'Beginner\';',
    activity: 'Change the filter to look for a different course level.',
  },
  Figma: {
    use: 'Figma helps plan screens and user flows before building a new SkillForge feature.',
    example: 'Browse topics → Select one → View details',
    activity: 'Sketch a three-step flow for a feature you would like to see in a learning app.',
  },
  Kubernetes: {
    use: 'Kubernetes can manage multiple app services when a platform needs to scale and stay available.',
    example: 'Web app replicas: 3\nHealth checks: enabled',
    activity: 'Think of one reason a site might need more than one running copy of its web app.',
  },
}

export function Technologies() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchError, setSearchError] = useState('')
  const [activityNote, setActivityNote] = useState('')
  const [activityError, setActivityError] = useState('')
  const [activityFeedback, setActivityFeedback] = useState('')
  const [activeGroup, setActiveGroup] = useState('All topics')
  const [searchParams, setSearchParams] = useSearchParams()
  const [completedTopics, setCompletedTopics] = useLocalStorage('skillforge-completed-topics', [])
  const selectedId = Number(searchParams.get('skill')) || TECHNOLOGIES[0].id

  const filteredTechs = useMemo(() => TECHNOLOGIES.filter((tech) => {
    const matchesSearch = `${tech.name} ${tech.description} ${tech.category}`.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGroup = activeGroup === 'All topics' || topicGroups[activeGroup]?.includes(tech.name)
    return matchesSearch && matchesGroup
  }), [searchTerm, activeGroup])

  const selectedTech = filteredTechs.find((tech) => tech.id === selectedId) || filteredTechs[0]
  const selectedLesson = selectedTech ? lessons[selectedTech.name] : null
  const searchTopics = (event) => {
    event.preventDefault()
    const normalized = searchTerm.trim()
    if (normalized && normalized.length < 2) {
      setSearchError('Enter at least 2 characters to search.')
      return
    }
    setSearchError('')
  }

  const toggleCompleted = () => {
    if (!selectedTech) return
    setCompletedTopics((topics) => topics.includes(selectedTech.id)
      ? topics.filter((id) => id !== selectedTech.id)
      : [...topics, selectedTech.id])
  }

  const submitActivity = (event) => {
    event.preventDefault()
    if (activityNote.trim().length < 3) {
      setActivityError('Add a short note about what you tried.')
      setActivityFeedback('')
      return
    }
    setActivityError('')
    setActivityFeedback('Nice work. Keep experimenting and see what changes.')
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8">
      <header className="mx-auto max-w-2xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-primary">Technology Explorer</p>
        <h1 className="section-heading">Pick a skill. See what you can make.</h1>
        <p className="mx-auto max-w-xl text-slate-600 dark:text-slate-300">Browse a topic, see how it fits into a project, then try a small activity.</p>
      </header>

      <form onSubmit={searchTopics} className="mx-auto max-w-2xl" noValidate>
        <label htmlFor="technology-search" className="sr-only">Search technologies</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input id="technology-search" className="input-field !pl-11" type="search" value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value); setSearchError('') }} placeholder="Search React, HTML, Python..." aria-invalid={Boolean(searchError)} aria-describedby={searchError ? 'technology-search-error' : undefined} />
          </div>
          <button type="submit" className="btn-outline">Search</button>
        </div>
        {searchError && <p className="mt-2 text-sm text-red-600" id="technology-search-error" role="alert">{searchError}</p>}
      </form>

      <div className="flex flex-wrap justify-center gap-2" aria-label="Filter technology topics">
        {['All topics', ...Object.keys(topicGroups)].map((group) => (
          <button key={group} type="button" onClick={() => setActiveGroup(group)} aria-pressed={activeGroup === group} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeGroup === group ? 'bg-secondary text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-primary dark:border-dark-border dark:bg-dark-card dark:text-slate-300'}`}>
            {group}
          </button>
        ))}
      </div>

      {selectedTech ? (
        <>
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>{filteredTechs.length} topics</span>
            <span>{completedTopics.length} completed</span>
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <section aria-label="Choose a technology" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {filteredTechs.map((tech) => {
                const isSelected = selectedTech.id === tech.id
                const isComplete = completedTopics.includes(tech.id)
                return <button type="button" key={tech.id} onClick={() => setSearchParams({ skill: String(tech.id) })} aria-pressed={isSelected} className={`relative flex min-h-28 flex-col items-start justify-between rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary dark:bg-primary/10' : 'border-slate-200 bg-white dark:border-dark-border dark:bg-dark-card'}`}>
                  <span className="text-2xl" aria-hidden="true">{tech.icon}</span>
                  <span className="mt-3 flex w-full items-center justify-between gap-2"><span className="font-semibold">{tech.name}</span>{isComplete && <Check size={16} className="text-emerald-600" aria-label="Completed" />}</span>
                </button>
              })}
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

              <div className="mt-6 grid gap-3 rounded-lg bg-slate-50 p-4 sm:grid-cols-2 dark:bg-dark-bg">
                <div className="flex items-center gap-3"><BookOpen size={19} className="text-primary" aria-hidden="true" /><div><p className="text-xs text-slate-500 dark:text-slate-400">Starting level</p><p className="font-medium">{selectedTech.level}</p></div></div>
                <div className="flex items-center gap-3"><Clock3 size={19} className="text-primary" aria-hidden="true" /><div><p className="text-xs text-slate-500 dark:text-slate-400">Suggested learning time</p><p className="font-medium">{selectedTech.learningTime}</p></div></div>
              </div>

              <section className="mt-6">
                <h3 className="font-semibold">How it fits into a SkillForge project</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{selectedLesson.use}</p>
              </section>

              <section className="mt-6">
                <h3 className="font-semibold">A small example</h3>
                <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm leading-6 text-slate-100"><code>{selectedLesson.example}</code></pre>
              </section>

              <section className="mt-6 rounded-lg border border-primary/20 bg-primary/[0.04] p-4 dark:bg-primary/10">
                <h3 className="font-semibold">Try it</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{selectedLesson.activity}</p>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Start with the example above, then make one small change of your own.</p>
                <form onSubmit={submitActivity} className="mt-4 space-y-2" noValidate>
                  <label htmlFor="technology-activity-note" className="block text-sm font-medium">What did you try?</label>
                  <textarea id="technology-activity-note" className="input-field min-h-20 resize-y" rows="2" value={activityNote} onChange={(event) => { setActivityNote(event.target.value); setActivityError(''); setActivityFeedback('') }} placeholder="Write a few words about your change..." aria-invalid={Boolean(activityError)} aria-describedby={activityError ? 'technology-activity-error' : activityFeedback ? 'technology-activity-feedback' : undefined} />
                  {activityError && <p id="technology-activity-error" className="text-sm text-red-600" role="alert">{activityError}</p>}
                  {activityFeedback && <p id="technology-activity-feedback" className="text-sm text-emerald-700 dark:text-emerald-300" role="status">{activityFeedback}</p>}
                  <button className="btn-outline" type="submit">Save my note</button>
                </form>
              </section>

              <div className="mt-6">
                <h3 className="font-semibold">Useful for</h3>
                <div className="mt-3 flex flex-wrap gap-2">{selectedTech.relatedCareers.map((career) => <span key={career} className="rounded-full bg-primary/10 px-3 py-1.5 text-sm text-primary">{career}</span>)}</div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button type="button" onClick={toggleCompleted} className={completedTopics.includes(selectedTech.id) ? 'btn-outline inline-flex items-center gap-2' : 'btn-primary inline-flex items-center gap-2'}>
                  <CheckCircle size={17} aria-hidden="true" />{completedTopics.includes(selectedTech.id) ? 'Completed' : 'Mark topic complete'}
                </button>
                <Link to="/pricing" className="btn-outline inline-flex items-center justify-center">Subscribe</Link>
              </div>

              <div className="mt-7 border-t border-slate-200 pt-5 dark:border-dark-border">
                <h3 className="text-sm font-semibold">Good places to continue</h3>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">{selectedTech.resources.map((resource) => <li key={resource} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><Check size={15} className="text-primary" aria-hidden="true" />{resource}</li>)}</ul>
              </div>
            </article>
          </div>
        </>
      ) : (
        <div className="card p-10 text-center"><p className="text-slate-600 dark:text-slate-300">No technologies match that search and filter.</p><button className="btn-outline mt-4" onClick={() => { setSearchTerm(''); setSearchError(''); setActiveGroup('All topics') }}>Clear search and filter</button></div>
      )}
    </div>
  )
}
