import { createSlice } from '@reduxjs/toolkit'
import { Module } from '../../schemas/Module';


type moduleState = {
    all : Module[]
}
const initialState : moduleState = {
    all :  []
}


export const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    setModules: (state, data : { payload : Module[] }) => {
      state.all= data.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setModules } = modulesSlice.actions

export default modulesSlice.reducer