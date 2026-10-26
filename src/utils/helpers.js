export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function truncateText(text, length = 100) {
  if (!text) return ''
  return text.length > length ? `${text.substring(0, length)}...` : text
}

export function filterBySearch(items, searchTerm, searchFields = ['name']) {
  if (!searchTerm.trim()) return items

  const lowercaseSearch = searchTerm.toLowerCase()
  return items.filter(item =>
    searchFields.some(field =>
      String(item[field]).toLowerCase().includes(lowercaseSearch)
    )
  )
}

export function filterByCategory(items, category, categoryField = 'category') {
  if (!category) return items
  return items.filter(item => item[categoryField] === category)
}

export function filterByLevel(items, level) {
  if (!level) return items
  return items.filter(item => item.level === level || item.difficulty === level)
}

export function debounce(func, delay = 300) {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export function sortByProperty(items, property, order = 'asc') {
  return [...items].sort((a, b) => {
    const aValue = a[property]
    const bValue = b[property]

    if (typeof aValue === 'string') {
      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    return order === 'asc' ? aValue - bValue : bValue - aValue
  })
}

export function getUnique(items, property) {
  return [...new Set(items.map(item => item[property]))]
}
