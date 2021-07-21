import { createSlice } from '@reduxjs/toolkit'
import { LoginResponse } from '../../schemas/LoginResponse';
import { LoggedInUser } from '../../schemas/LoggedInUser';


type userState =  {
  user : LoggedInUser | null,
  token : string | null,
  loggedIn : boolean
}
const initialState : userState = {
  user : null, 
  token : null, 
  loggedIn : false
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedin: (state,data : { payload : LoginResponse }) => {
      state.user = data.payload.user;
      state.token = data.payload.token;
      state.loggedIn = true;
      localStorage.setItem("FLINK_ADMIN_TOKEN", state.token);
    },
    setLoggedout: (state) => {
      state.loggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("FLINK_ADMIN_TOKEN");
    },
  }
})

// Action creators are generated for each case reducer function
export const { setLoggedin, setLoggedout } = userSlice.actions;

export default userSlice.reducer;
