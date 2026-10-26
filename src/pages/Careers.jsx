import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CAREERS } from '../constants/data'
import { CareerCard } from '../components/common/CareerCard'
import { SearchBar } from '../components/common/SearchBar'
import { FilterBar, FilterTags } from '../components/common/FilterBar'
import { filterBySearch, filterByCategory, filterByLevel, getUnique } from '../utils/helpers'

export function Careers() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    domain: { label: 'Domain', options: [], value: null },
    difficulty: { label: 'Difficulty', options: [], value: null },
  })

  // Initialize filter options
  const filterOptions = useMemo(() => ({
    domain: getUnique(CAREERS, 'domain'),
    difficulty: getUnique(CAREERS, 'difficulty'),
  }), [])

  // Update filter options
  useMemo(() => {
    setFilters(prev => ({
      ...prev,
      domain: { ...prev.domain, options: filterOptions.domain },
      difficulty: { ...prev.difficulty, options: filterOptions.difficulty },
    }))
  }, [filterOptions])

  // Filter careers
  const filteredCareers = useMemo(() => {
    let results = filterBySearch(CAREERS, searchTerm, ['name', 'description', 'domain'])

    if (filters.domain.value) {
      results = filterByCategory(results, filters.domain.value, 'domain')
    }

    if (filters.difficulty.value) {
      results = filterByLevel(results, filters.difficulty.value)
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
        <h1 className="section-heading">Explore Careers</h1>
        <p className="section-subheading">Find your perfect career path</p>
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
            placeholder="Search careers, domains..."
          />

          {/* Filter Tags */}
          {(filters.domain.value || filters.difficulty.value) && (
            <FilterTags filters={filters} onRemoveFilter={handleRemoveFilter} />
          )}

          {/* Results Count */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Found {filteredCareers.length} career{filteredCareers.length !== 1 ? 's' : ''}
          </div>

          {/* Careers Grid */}
          {filteredCareers.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredCareers.map((career, index) => (
                <motion.div
                  key={career.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CareerCard
                    career={career}
                    onClick={() => navigate(`/careers/${career.id}`)}
                  />
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
                No careers found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilters(prev => ({
                    ...prev,
                    domain: { ...prev.domain, value: null },
                    difficulty: { ...prev.difficulty, value: null },
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
