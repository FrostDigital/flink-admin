import Layout, { Content } from "antd/lib/layout/layout"
import Sider from "antd/lib/layout/Sider"
import { useState } from "react"
import { useSelector } from "react-redux";
import { SideMenu } from "../components/SideMenu";
import { RootState } from "../store/store";
import { Spin } from "antd";


import {
    Switch,
    Route,
  } from "react-router-dom";
import { ManagementUser } from "../pages/ManagementUser";
import { User } from "../pages/User";



export const MainLayout = () =>{

    const showLoading = useSelector( (state : RootState) => state.loading.value);

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = (collapsed : boolean) => {
        setCollapsed(collapsed);
    };
    


    return (
    <div>
        {showLoading ? <Spin tip="Loading" size="large" className="spinnerWrapper" ></Spin> : null }  
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}>
                <SideMenu></SideMenu>
            </Sider>
            <Content style={{ margin: '16px', marginLeft: 220 }}>
                <Switch>
                    <Route path="/profile">
                        <div>Profile</div>
                    </Route>
                    <Route path="/modules/management_user/:moduleId">
                        <ManagementUser></ManagementUser>
                    </Route>     

                    <Route path="/modules/user/:moduleId">
                        <User></User>
                    </Route>                                        
                </Switch>


               

                
            </Content>
        </Layout>
    </div>
)

}