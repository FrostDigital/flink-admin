import { Button, Card, PageHeader, Skeleton, Space, Table,Input } from "antd"
import { Link, useHistory, useParams } from "react-router-dom"

import {
    PlusOutlined
  } from '@ant-design/icons';
import { useEffect } from "react";
import { useState } from "react";
import { apiClient } from "../utils/api";
import { ManagementUser} from "../schemas/ManagementUser";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { User } from "../schemas/User";


const { Search } = Input;

type userListState =  User[];
const initalState : userListState = [];

export const UserHome = () =>{
    const { moduleId } = useParams<{moduleId : string}>()
    const history = useHistory();
    
    const [users, setUsers] = useState(initalState)
    const [filteredUsers, setFilteredUsers] = useState(initalState)

    const [loading, setLoading] = useState(true);
    
    const modules = useSelector( ( state : RootState ) => state.modules);
    const module = modules.all.find( p=>p.id === moduleId)
    const moduleName = module?.title;
    

    function onSearch(value : string){
      const filter = value
      if(filter === ""){
        setFilteredUsers(users);
        return;
      }
      const fi = users.filter(p=>p.username.includes(filter));
      setFilteredUsers(fi);
    }
 
    useEffect(() => {
        async function fetchData(){
            const client  = new apiClient();
            const users = await client.userModuleList(moduleId);
            setUsers(users);
            setFilteredUsers(users);
            setLoading(false);
        }
        fetchData();

    
    }, [moduleId]);



    const columns : any = [
        {
          title: 'Name',
          dataIndex: 'username',
          key: 'username',

        },
       

      ];
      if(module?.features.includes("edit")){
          columns.push( {
            title: 'Action',
            width: '100px',
            key: 'action',
            render: (text : string, record : ManagementUser)=> (
              <Space size="middle">
                
                <Link to={"/modules/user/" +  moduleId + "/edit/" +  record._id}>Edit</Link>
              </Space>
            ),
          },)
  
      }else{
        columns.push( {
          title: 'Action',
          width: '100px',
          key: 'action',
          render: (text : string, record : ManagementUser)=> (
            <Space size="middle">
              <Link to={"/modules/user/" +  moduleId + "/edit/" +  record._id + "/password"}>Change password</Link>
            </Space>
          ),
        },)        
      }
      



    return (<Space direction="vertical" style={{ width: "100%" }}><PageHeader
    className="site-page-header"
    ghost={false}
    title={moduleName}
    subTitle=""
    extra={[
      
      <Space>
        {module?.features.includes("create") ? <Button type="primary" icon={<PlusOutlined></PlusOutlined>}>Add user</Button> : null}

      <Search key="1" placeholder="input search text" onSearch={onSearch} allowClear enterButton />
      </Space>

    ]}>

    </PageHeader>

    
    {loading ? <Skeleton></Skeleton> : <Table rowKey="_id" dataSource={filteredUsers} columns={columns}  />}
    
    </Space>
    )
  



}