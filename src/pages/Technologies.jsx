import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { TECHNOLOGIES } from '../constants/data'
import { TechCard } from '../components/common/TechCard'
import { SearchBar } from '../components/common/SearchBar'
import { FilterBar, FilterTags } from '../components/common/FilterBar'
import { filterBySearch, filterByCategory, filterByLevel, getUnique } from '../utils/helpers'

export function Technologies() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    category: { label: 'Category', options: [], value: null },
    level: { label: 'Level', options: [], value: null },
  })

  // Initialize filter options
  const filterOptions = useMemo(() => ({
    category: getUnique(TECHNOLOGIES, 'category'),
    level: getUnique(TECHNOLOGIES, 'level'),
  }), [])

  // Update filter options
  useMemo(() => {
    setFilters(prev => ({
      ...prev,
      category: { ...prev.category, options: filterOptions.category },
      level: { ...prev.level, options: filterOptions.level },
    }))
  }, [filterOptions])

  // Filter technologies
  const filteredTechs = useMemo(() => {
    let results = filterBySearch(TECHNOLOGIES, searchTerm, ['name', 'description', 'category'])

    if (filters.category.value) {
      results = filterByCategory(results, filters.category.value, 'category')
    }

    if (filters.level.value) {
      results = filterByLevel(results, filters.level.value)
    }

    return results
  }, [searchTerm, filters])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: { ...prev[key], value },
    }))
  }

  const handleRemoveFilter = (key) => {
    handleFilterChange(key, null)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="section-heading">Master Technologies</h1>
        <p className="section-subheading">Learn the tools and languages shaping the future</p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="card p-6 sticky top-24">
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 space-y-6"
        >
          {/* Search Bar */}
          <SearchBar
            onSearch={setSearchTerm}
            placeholder="Search technologies..."
          />

          {/* Filter Tags */}
          {(filters.category.value || filters.level.value) && (
            <FilterTags filters={filters} onRemoveFilter={handleRemoveFilter} />
          )}

          {/* Results Count */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Found {filteredTechs.length} technology{filteredTechs.length !== 1 ? 's' : ''}
          </div>

          {/* Technologies Grid */}
          {filteredTechs.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.05 }}
            >
              {filteredTechs.map((tech, index) => (
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TechCard tech={tech} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card p-12 text-center"
            >
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                No technologies found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilters(prev => ({
                    ...prev,
                    category: { ...prev.category, value: null },
                    level: { ...prev.level, value: null },
                  }))
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
