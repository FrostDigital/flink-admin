import { Card, Space } from "antd"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../store/store"
import config from "../config"
import { Module } from "../schemas/Module"
import {
    InfoCircleOutlined,
    UsergroupAddOutlined,
    KeyOutlined,
    DatabaseOutlined
  } from '@ant-design/icons';



export const Home = () =>{

    const modules = useSelector( ( state : RootState) => state.modules)
    let items = modules.all.filter( m => m.ui === "true");

    const gridStyle : any = {
    width: '33%',
    textAlign: 'center',
    };


    const getIcon = (m : Module) =>{
        let icon =  <InfoCircleOutlined style={{ fontSize: '48px' }}/>;
        switch(m.type){
          case "USER":
            icon =  <UsergroupAddOutlined style={{ fontSize: '48px' }} />;
            break;
          case "MANAGEMENT_USER":
            icon = <KeyOutlined style={{ fontSize: '48px' }} />;
            break;
          case "REPO":
            icon = <DatabaseOutlined style={{ fontSize: '48px' }}/>;
            break;
        }
        return icon
    }

return (
    
          <Card title={config.title}>
              {items.map( m => <Card.Grid style={gridStyle}>
                  
                  <Link to={ "/modules/" + m.type.toLocaleLowerCase() + "/" + m.id}>
                  <Space direction="vertical">
                        {getIcon(m)}
                      <div>{m.title}</div>
                      </Space>
                  </Link>
                  
                
                
                  
                </Card.Grid> )}
    

  </Card>


)




}





