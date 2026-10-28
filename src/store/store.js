import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import savedItemsReducer from './savedItemsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    savedItems: savedItemsReducer,
  },
})

store.subscribe(() => {
  const { favorites, bookmarks } = store.getState().savedItems
  try {
    window.localStorage.setItem('favorites', JSON.stringify(favorites))
    window.localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  } catch (error) {
    console.error('Unable to save favorites and bookmarks:', error)
  }
})
