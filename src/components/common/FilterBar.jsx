import { Filter } from './Icons'

export function FilterBar({ filters, onFilterChange, showLabel = true }) {
  return (
    <div className="space-y-4">
      {showLabel && (
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold">
          <Filter className="w-5 h-5" />
          Filters
        </div>
      )}

      <div className="space-y-3">
        {Object.entries(filters).map(([key, { label, options, value }]) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {label}
            </label>
            <select
              value={value || ''}
              onChange={(e) => onFilterChange(key, e.target.value || null)}
              className="input-field w-full"
            >
              <option value="">All {label}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FilterTags({ filters, onRemoveFilter }) {
  const activeTags = Object.entries(filters)
    .filter(([, value]) => value.value)
    .map(([key, value]) => ({ key, label: value.label, value: value.value }))

  if (activeTags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {activeTags.map(({ key, label, value }) => (
        <div
          key={key}
          className="bg-primary text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
        >
          <span>{value}</span>
          <button
            onClick={() => onRemoveFilter(key)}
            className="hover:opacity-70 transition-opacity"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
