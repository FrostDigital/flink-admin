import { useRouteMatch, Switch, Route } from "react-router-dom"
import { RepoHome } from "./RepoHome";



export const Repo = () =>{
    let match = useRouteMatch();


    return (<Switch>
        <Route path={`${match.path}/`}>
            <RepoHome></RepoHome>
        </Route>     
    </Switch>)



}





