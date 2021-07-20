import { useRouteMatch } from "react-router-dom"
import  { ManagementUserHome } from "./ManagementUserHome"

import {
    Switch,
    Route,
  } from "react-router-dom";
import { ManagementUserAdd } from "./ManagementUserAdd";
import { ManagementUserEdit } from "./ManagementUserEdit";
import { ManagementUserPassword } from "./ManagementUserPassword";


export const ManagementUser = () =>{
    let match = useRouteMatch();


    return (<Switch>
        <Route path={`${match.path}/add`}>
            <ManagementUserAdd></ManagementUserAdd>
        </Route>     

        <Route path={`${match.path}/edit/:userId/password`}>
            <ManagementUserPassword></ManagementUserPassword>
        </Route>     

        <Route path={`${match.path}/edit/:userId`}>
            <ManagementUserEdit></ManagementUserEdit>
        </Route>     

        <Route path={`${match.path}/`}>
            <ManagementUserHome></ManagementUserHome>
        </Route>     

    </Switch>)



}