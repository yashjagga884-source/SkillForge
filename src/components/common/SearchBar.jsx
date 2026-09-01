import { useState } from 'react'
import { Search, X } from './Icons'
import { debounce } from '../../utils/helpers'

export function SearchBar({ onSearch, placeholder = 'Search...', className = '' }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = debounce((value) => {
    onSearch(value)
  }, 300)

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    handleSearch(value)
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="input-field pl-12 pr-10 w-full"
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
