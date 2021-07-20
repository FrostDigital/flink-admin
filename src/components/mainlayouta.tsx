import Layout, { Content } from "antd/lib/layout/layout"
import Sider from "antd/lib/layout/Sider"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { SideMenu } from "./menu";
import { RootState } from "../store/store";
import { Button, Spin } from "antd";
import { show, hide } from "../store/features/loading";

export const MainLayout = () =>{

    const showLoading = useSelector( (state : RootState) => state.loading.value);
    const dispatch = useDispatch()

    function ButtonClick(){
        setTimeout(()=>{
            dispatch(hide())
        }, 1000)
        dispatch(show());
    }

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = (collapsed : boolean) => {
        setCollapsed(collapsed);
    };

    let loading;
    if(showLoading){
        loading = <Spin tip="Loading" size="large" className="spinnerWrapper" ></Spin>;
    }
    return (
    <div>
                {loading}  
                <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <SideMenu></SideMenu>
        </Sider>
        <Content style={{ margin: '16px' }}>
            Content {showLoading ? "hello" : "world"}

            <Button type="dashed" onClick={ ButtonClick }>Click on button</Button>
        </Content>
    </Layout>
    </div>
)

}