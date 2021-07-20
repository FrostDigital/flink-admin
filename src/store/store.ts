import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loadingReducer from './features/loading'
import userReducer from './features/user'
import modulesReducer from './features/modules'


export const rootReducer = combineReducers({
    loading : loadingReducer,
    user : userReducer,
    modules : modulesReducer
});


export default configureStore({
  reducer: rootReducer
})


export type RootState = ReturnType<typeof rootReducer>
