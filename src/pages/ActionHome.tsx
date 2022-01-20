import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom"


import {
    Switch,
    Route,
  } from "react-router-dom";
import { UserAdd } from "./UserAdd";
import { UserEdit } from "./UserEdit";
import { UserView } from "./UserView";

import { UserHome } from "./UserHome";
import { UserPassword } from "./UserPassword";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { PageHeader, Skeleton, Space, Table } from "antd";
import { Action } from "../schemas/Action";


export const ActionHome = () =>{
    let match = useRouteMatch();
    const history = useHistory();

    const { moduleId } = useParams<{moduleId : string}>()

    
    const modules = useSelector( ( state : RootState ) => state.modules);
    const module = modules.all.find( p=>p.id === moduleId)
    const moduleName = module?.title;

    
    let data = module!.data;
    

    const columns : any = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
          },        
        {
            title: 'Action',
            width: '100px',
            key: 'action',
            render: (text : string, record : Action)=> (
              <Space size="middle">
                
                <Link to={"/modules/action/" +  module?.id + "/" +  record.id}>Execute</Link>
              </Space>
            ),
        }

      ];



    return (<Space direction="vertical" style={{ width: "100%" }}><PageHeader
    className="site-page-header"
    ghost={false}
    title={moduleName}
    subTitle=""
    >

    </PageHeader>

    <Table rowKey="id" dataSource={data.actions} columns={columns}  />

    </Space>
    )



}





