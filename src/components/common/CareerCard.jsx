import { ArrowUpRight, Briefcase, Clock3, Star, TrendingUp } from './Icons'
import { motion } from './StaticMotion'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import toast from '../../utils/toast'

export function CareerCard({ career, onClick }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const isFavorited = favorites.includes(career.id)

  const handleFavorite = (e) => {
    e.stopPropagation()
    if (isFavorited) {
      setFavorites(favorites.filter(id => id !== career.id))
      toast.success('Removed from favorites')
    } else {
      setFavorites([...favorites, career.id])
      toast.success('Added to favorites')
    }
  }

  return (
    <motion.div
      whileHover={{ y: -7 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="card relative flex h-full cursor-pointer flex-col overflow-hidden p-6 group hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:border-indigo-400/50"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-indigo-400 to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-3xl shadow-sm ring-1 ring-indigo-100 dark:bg-indigo-400/10 dark:ring-indigo-400/10">{career.icon}</div>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-primary dark:bg-indigo-400/10 dark:text-indigo-200">
            {career.domain}
          </span>
        </div>
        <button
          onClick={handleFavorite}
          aria-label={isFavorited ? `Remove ${career.name} from favorites` : `Add ${career.name} to favorites`}
          className={`rounded-xl p-2.5 transition-all ${
            isFavorited
              ? 'bg-amber-100 text-amber-500 dark:bg-amber-400/15'
              : 'bg-slate-100 text-slate-400 hover:bg-amber-50 hover:text-amber-500 dark:bg-dark-border dark:hover:bg-amber-400/10'
          }`}
        >
          <Star className="w-5 h-5" fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
      </div>

      <h3 className="mb-2 text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
        {career.name}
      </h3>

      <p className="mb-5 min-h-[40px] text-sm leading-5 text-gray-600 dark:text-gray-400 line-clamp-2">
        {career.description}
      </p>

      <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-slate-100 bg-slate-50/60 text-sm dark:border-dark-border dark:bg-slate-900/20">
        <div className="border-b border-r border-slate-100 p-3 dark:border-dark-border">
          <span className="block text-xs font-medium text-gray-500 dark:text-gray-400">Level</span>
          <span className="mt-1 block font-semibold text-ink dark:text-slate-100">{career.difficulty}</span>
        </div>
        <div className="border-b border-slate-100 p-3 dark:border-dark-border">
          <span className="block text-xs font-medium text-gray-500 dark:text-gray-400">Duration</span>
          <span className="mt-1 flex items-center gap-1.5 font-semibold text-ink dark:text-slate-100"><Clock3 className="h-3.5 w-3.5 text-primary" />{career.duration}</span>
        </div>
        <div className="border-r border-slate-100 p-3 dark:border-dark-border">
          <span className="block text-xs font-medium text-gray-500 dark:text-gray-400">Typical salary</span>
          <span className="mt-1 block font-semibold text-emerald-600 dark:text-emerald-400">{career.salary}</span>
        </div>
        <div className="p-3">
          <span className="block text-xs font-medium text-gray-500 dark:text-gray-400">Opportunities</span>
          <span className="mt-1 flex items-center gap-1.5 font-semibold text-amber-600 dark:text-amber-400"><TrendingUp className="h-3.5 w-3.5" />{career.demand}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {career.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {skill}
          </span>
        ))}
        {career.skills.length > 3 && <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">+{career.skills.length - 3}</span>}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm dark:border-dark-border">
        <span className="flex items-center gap-2 font-semibold text-slate-600 dark:text-slate-300"><Briefcase className="h-4 w-4 text-primary" />Career roadmap</span>
        <span className="flex items-center gap-1 font-semibold text-primary transition-transform group-hover:translate-x-1">View <ArrowUpRight className="h-4 w-4" /></span>
      </div>
    </motion.div>
  )
}
