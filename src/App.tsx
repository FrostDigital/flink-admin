
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




