import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    value: false,
    appReady : false,
    appOffline : false

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
    },
    setAppOffline: state => {
      state.appOffline = true;
    },    
    setAppOnline: state => {
      state.appOffline = false;
    }        
  }
})

// Action creators are generated for each case reducer function
export const { show, hide, setAppReady, setAppOffline, setAppOnline } = loadingSlice.actions

export default loadingSlice.reducer