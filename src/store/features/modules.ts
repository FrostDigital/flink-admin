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
        console.log("setting modules", data)
      state.all= data.payload
      console.log("state", state)
    }
  }
})

// Action creators are generated for each case reducer function
export const { setModules } = modulesSlice.actions

export default modulesSlice.reducer