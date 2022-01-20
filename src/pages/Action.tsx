import { useRouteMatch } from "react-router-dom"


import {
    Switch,
    Route,
  } from "react-router-dom";
import { ActionExecute } from "./ActionExecute";
import { ActionHome } from "./ActionHome";

export const Action = () =>{
    let match = useRouteMatch();


    return (<Switch>
        <Route path={`${match.path}/:actionId`}>
            <ActionExecute></ActionExecute>
        </Route>     

  
        <Route path={`${match.path}/`}>
            <ActionHome></ActionHome>
        </Route>     

    </Switch>)



}





