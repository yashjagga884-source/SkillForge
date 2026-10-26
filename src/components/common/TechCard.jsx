import { Bookmark } from './Icons'
import { motion } from './StaticMotion'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import toast from '../../utils/toast'

export function TechCard({ tech }) {
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', [])
  const isBookmarked = bookmarks.includes(tech.id)

  const handleBookmark = (e) => {
    e.stopPropagation()
    if (isBookmarked) {
      setBookmarks(bookmarks.filter(id => id !== tech.id))
      toast.success('Removed bookmark')
    } else {
      setBookmarks([...bookmarks, tech.id])
      toast.success('Bookmarked!')
    }
  }

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="card p-6 group hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:border-indigo-400/30"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-3xl dark:bg-emerald-400/10">{tech.icon}</div>
        <button
          onClick={handleBookmark}
          className={`p-2 rounded-lg transition-all ${
            isBookmarked
              ? 'bg-secondary text-white'
              : 'bg-slate-100 dark:bg-dark-border text-slate-400 group-hover:text-secondary'
          }`}
        >
          <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {tech.name}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
        {tech.description}
      </p>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Category</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tech.level)}`}>
            {tech.category}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Level</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tech.level)}`}>
            {tech.level}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Learning Time</span>
          <span className="font-medium text-sm">{tech.learningTime}</span>
        </div>

        <div className="pt-2">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Related Careers</p>
          <div className="flex flex-wrap gap-1">
            {tech.relatedCareers.slice(0, 2).map((career) => (
              <span
                key={career}
                className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-1 rounded"
              >
                {career}
              </span>
            ))}
            {tech.relatedCareers.length > 2 && (
              <span className="text-xs text-gray-500 px-2 py-1">+{tech.relatedCareers.length - 2}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
