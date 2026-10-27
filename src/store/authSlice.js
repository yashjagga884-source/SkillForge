import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { email: '' },
  reducers: {
    signIn: (state, action) => {
      state.email = action.payload
    },
    signOut: (state) => {
      state.email = ''
    },
  },
})

export const { signIn, signOut } = authSlice.actions
export default authSlice.reducer
