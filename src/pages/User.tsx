import { useRouteMatch } from "react-router-dom"


import {
    Switch,
    Route,
  } from "react-router-dom";
import { UserAdd } from "./UserAdd";
import { UserEdit } from "./UserEdit";
import { UserView } from "./UserView";

import { UserHome } from "./UserHome";
import { UserPassword } from "./UserPassword";


export const User = () =>{
    let match = useRouteMatch();


    return (<Switch>
        <Route path={`${match.path}/add`}>
            <UserAdd></UserAdd>
        </Route>     

        <Route path={`${match.path}/edit/:userId/password`}>
            <UserPassword></UserPassword>
        </Route>     

        <Route path={`${match.path}/edit/:userId`}>
            <UserEdit></UserEdit>
        </Route>     
        <Route path={`${match.path}/view/:userId`}>
            <UserView></UserView>
        </Route>     


        <Route path={`${match.path}/`}>
            <UserHome></UserHome>
        </Route>     

    </Switch>)



}





