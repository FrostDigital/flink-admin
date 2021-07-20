import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    value: false,
    appReady : false
  },
  reducers: {
    show: state => {
      state.value = true;
    },
    hide: state => {
      state.value = false;
    },
    setAppReady: state => {
      state.appReady = true;
    }
  }
})

// Action creators are generated for each case reducer function
export const { show, hide, setAppReady } = loadingSlice.actions

export default loadingSlice.reducer