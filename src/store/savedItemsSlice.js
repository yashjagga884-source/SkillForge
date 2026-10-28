import { createSlice } from '@reduxjs/toolkit'

function readSavedItems(key) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

function toggleItem(items, id) {
  return items.includes(id) ? items.filter((itemId) => itemId !== id) : [...items, id]
}

const savedItemsSlice = createSlice({
  name: 'savedItems',
  initialState: {
    favorites: readSavedItems('favorites'),
    bookmarks: readSavedItems('bookmarks'),
  },
  reducers: {
    toggleFavorite(state, action) {
      state.favorites = toggleItem(state.favorites, action.payload)
    },
    toggleBookmark(state, action) {
      state.bookmarks = toggleItem(state.bookmarks, action.payload)
    },
  },
})

export const { toggleFavorite, toggleBookmark } = savedItemsSlice.actions
export default savedItemsSlice.reducer
