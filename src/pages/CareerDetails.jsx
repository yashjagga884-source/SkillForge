import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from '../components/common/StaticMotion'
import { ArrowLeft, Bookmark, Share2 } from '../components/common/Icons'
import { CAREERS } from '../constants/data'
import { useLocalStorage } from '../hooks/useLocalStorage'
import toast from '../utils/toast'

export function CareerDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('recentlyViewed', [])
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', [])

  const career = CAREERS.find(c => c.id === parseInt(id))

  // Track recently viewed
  React.useEffect(() => {
    if (career) {
      const updated = [career.id, ...recentlyViewed.filter(cid => cid !== career.id)].slice(0, 10)
      setRecentlyViewed(updated)
    }
  }, [id])

  if (!career) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Career not found</h2>
        <button
          onClick={() => navigate('/careers')}
          className="btn-primary"
        >
          Back to Careers
        </button>
      </div>
    )
  }

  const isBookmarked = bookmarks.includes(career.id)

  const handleBookmark = () => {
    if (isBookmarked) {
      setBookmarks(bookmarks.filter(bid => bid !== career.id))
      toast.success('Removed bookmark')
    } else {
      setBookmarks([...bookmarks, career.id])
      toast.success('Bookmarked!')
    }
  }

  const handleShare = () => {
    const url = window.location.href
    if (navigator.share) {
      navigator.share({
        title: career.name,
        text: career.description,
        url: url,
      })
    } else {
      navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard!')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate('/careers')}
        className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Careers
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl">{career.icon}</span>
              <div>
                <h1 className="text-4xl font-bold font-poppins">{career.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{career.domain}</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
              {career.description}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleBookmark}
              className={`p-3 rounded-lg transition-all ${
                isBookmarked
                  ? 'bg-secondary text-white'
                  : 'bg-gray-200 dark:bg-dark-border text-gray-600'
              }`}
            >
              <Bookmark className="w-6 h-6" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleShare}
              className="p-3 rounded-lg bg-gray-200 dark:bg-dark-border hover:bg-primary hover:text-white transition-all"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Key Info Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Difficulty', value: career.difficulty },
          { label: 'Duration', value: career.duration },
          { label: 'Avg Salary', value: career.salary },
          { label: 'Demand', value: career.demand },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="card p-4 text-center"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{item.label}</p>
            <p className="font-bold text-lg">{item.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Roadmap Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Learning Path */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6">Learning Roadmap</h2>
            <div className="space-y-4">
              {career.roadmap.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{step}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {index === 0 && 'Build your foundation with the basics'}
                      {index === 1 && 'Learn core concepts and best practices'}
                      {index === 2 && 'Start working on real projects'}
                      {index === career.roadmap.length - 1 && 'Master advanced topics and specialization'}
                      {index > 2 && index < career.roadmap.length - 1 && 'Deepen your expertise and knowledge'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6">Required Skills</h2>
            <div className="flex flex-wrap gap-3">
              {career.skills.map((skill) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-primary bg-opacity-10 text-primary rounded-full font-medium text-sm hover:bg-opacity-20 transition-colors cursor-pointer"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6">Portfolio Projects</h2>
            <div className="space-y-3">
              {career.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="p-4 border-l-4 border-primary bg-gray-50 dark:bg-dark-card rounded-lg"
                >
                  <p className="font-semibold">{project}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Companies */}
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-4">Top Companies</h3>
            <div className="space-y-2">
              {career.companies.map((company) => (
                <div
                  key={company}
                  className="p-3 bg-gray-100 dark:bg-dark-border rounded-lg text-center font-medium"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            className="card p-6 bg-gradient-to-br from-primary to-secondary text-white text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold mb-2">Start Learning</h3>
            <p className="text-sm mb-4 opacity-90">
              Begin your {career.name} journey with our personalized roadmap
            </p>
            <button className="w-full bg-white text-primary hover:bg-gray-100 font-bold py-2 rounded-lg transition-colors">
              Create Roadmap
            </button>
          </motion.div>

          {/* Quick Stats */}
          <div className="card p-6 space-y-4">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Average Salary</p>
              <p className="text-2xl font-bold text-green-600">{career.salary}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Learning Duration</p>
              <p className="text-2xl font-bold">{career.duration}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Market Demand</p>
              <p className="text-2xl font-bold text-accent">{career.demand}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
