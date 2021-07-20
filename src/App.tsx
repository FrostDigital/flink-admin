import React from 'react';
import './App.css';


import { Provider, useSelector } from 'react-redux'
import { setLoggedin, } from './store/features/user';
import { setAppReady } from './store/features/loading';

import store  from "./store/store";

import { AppLayout } from './layouts/AppLayout';
import { apiClient } from './utils/api';
import { RootState } from "./store/store";
import { setModules } from './store/features/modules';

export default function App() {
 
  return (  

    <Provider store={store}>
       <AppLayoutContainer/>
    </Provider>
    
  );

  
}


function AppLayoutContainer(){
  const isAppReady = useSelector( (state : RootState) => state.loading.appReady);

return (
  <AppLayout isReady={isAppReady}/>
)
}


const init = async () => {
  const client = new apiClient();
  const token = localStorage.getItem("FLINK_ADMIN_TOKEN");
  if(token != null){
    try{
      const loginResponse = await client.me(token); 
      const modules = await client.managementApi();
      store.dispatch(setModules(modules));
      store.dispatch(setLoggedin(loginResponse))

    }catch(ex){
  
    }
  }
  store.dispatch(setAppReady())


}
init();





// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Topics() {
//   let match = useRouteMatch();

//   return (
//     <div>
//       <h2>Topics</h2>

//       <ul>
//         <li>
//           <Link to={`${match.url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`topics/props-v-state`}>
//             Props v. State
//           </Link>
//         </li>
//       </ul>

//       {/* The Topics page has its own <Switch> with more routes
//           that build on the /topics URL path. You can think of the
//           2nd <Route> here as an "index" page for all topics, or
//           the page that is shown when no topic is selected */}
//       <Switch>
//         <Route path={`${match.path}/:topicId`}>
//           <Topic />
//         </Route>
//         <Route path={match.path}>
//           <h3>Please select a topic.</h3>
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// function Topic() {
//   let { topicId } = useParams<{topicId : string}>();
//   return <h3>Requested topic ID: {topicId}</h3>;
// }


