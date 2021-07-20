import { useRouteMatch } from "react-router-dom"


import {
    Switch,
    Route,
  } from "react-router-dom";
import { UserEdit } from "./UserEdit";

import { UserHome } from "./UserHome";
import { UserPassword } from "./UserPassword";


export const User = () =>{
    let match = useRouteMatch();


    return (<Switch>
        <Route path={`${match.path}/add`}>
            <UserHome></UserHome>
        </Route>     

        <Route path={`${match.path}/edit/:userId/password`}>
            <UserPassword></UserPassword>
        </Route>     

        <Route path={`${match.path}/edit/:userId`}>
            <UserEdit></UserEdit>
        </Route>     

        <Route path={`${match.path}/`}>
            <UserHome></UserHome>
        </Route>     

    </Switch>)



}





