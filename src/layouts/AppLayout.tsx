import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Spin } from "antd";

import { MainLayout } from './MainLayout';
import { LoginLayout } from './LoginLayout';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";


export interface MainLayoutProps{
    isReady : boolean
}

export const AppLayout = (props : MainLayoutProps ) =>{

    const showLoading = useSelector( (state : RootState) => state.loading.value);
    const isAuthenticated = useSelector( (state : RootState) => state.user.loggedIn);


    


    return (
    <div>
        {showLoading || (!props.isReady) ? <Spin tip="Loading" size="large" className="spinnerWrapper" ></Spin> : null }  
        {props.isReady ?(
              <Router>
                <Switch>
                  <Route path="/login">
                    <LoginLayout></LoginLayout>
                  </Route>          
                  <Route path="/">
                    {(isAuthenticated ?  <MainLayout></MainLayout> : <Redirect to="/login"></Redirect>)}
                  </Route>
                  </Switch>
              </Router>
        ) : (
            <div></div>
        )}

    </div>
)

}