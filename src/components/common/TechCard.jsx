import { Bookmark } from 'lucide-react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { toggleBookmark } from '../../store/savedItemsSlice'
import toast from 'react-hot-toast'

export function TechCard({ tech }) {
  const dispatch = useDispatch()
  const bookmarks = useSelector((state) => state.savedItems.bookmarks)
  const isBookmarked = bookmarks.includes(tech.id)

  const handleBookmark = (e) => {
    e.stopPropagation()
    if (isBookmarked) {
      dispatch(toggleBookmark(tech.id))
      toast.success('Removed bookmark')
    } else {
      dispatch(toggleBookmark(tech.id))
      toast.success('Bookmarked!')
    }
  }

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
      case 'advanced':
        return 'bg-blue-200 text-blue-900 dark:bg-blue-700 dark:text-blue-50'
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-dark-border dark:text-blue-100'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, translateY: -5 }}
      transition={{ duration: 0.3 }}
      className="card p-6 group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="text-4xl">{tech.icon}</div>
        <button
          onClick={handleBookmark}
          className={`p-2 rounded-lg transition-all ${
            isBookmarked
              ? 'bg-secondary text-white'
              : 'bg-blue-50 dark:bg-dark-border text-blue-400 group-hover:text-secondary'
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
