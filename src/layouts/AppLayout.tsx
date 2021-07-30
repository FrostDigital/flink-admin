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
import { AppOffline } from "../components/AppOffline";


export interface MainLayoutProps{
    isReady : boolean
}

export const AppLayout = (props : MainLayoutProps ) =>{

    const showLoading = useSelector( (state : RootState) => state.loading.value);
    const isOffline = useSelector ( (state : RootState) => state.loading.appOffline);
    const isAuthenticated = useSelector( (state : RootState) => state.user.loggedIn);


    


    return (
    <div>
        {showLoading || (!props.isReady) ? <Spin tip="Loading" size="large" className="spinnerWrapper" ></Spin> : null }  
        {isOffline && <AppOffline/>}
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