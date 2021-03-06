import { Button, PageHeader, Skeleton, Space, Table,Input } from "antd"
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
      const filter = value.toLowerCase();
      if(filter === ""){
        setFilteredUsers(users);
        return;
      }
      const fi = users.filter(p=>p.username.toLowerCase().includes(filter));
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
          render: (text : string, record : ManagementUser)=> (
            <Space size="middle">
              { module?.features.includes("view") ?  <Link to={"/modules/user/" +  moduleId + "/view/" +  record._id}>{text}</Link> : <div>{text}</div> }
              
            </Space>
          ),
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
  
      }else if(module?.features.includes("view")){
        columns.push( {
          title: 'Action',
          width: '100px',
          key: 'action',
          render: (text : string, record : ManagementUser)=> (
            <Space size="middle">
              
              <Link to={"/modules/user/" +  moduleId + "/view/" +  record._id}>View</Link>
            </Space>
          )
        },)


      } else  {
        columns.push( {
          title: 'Action',
          width: '100px',
          key: 'password',
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
      
      <Space key="1">
        {module?.features.includes("create") ? <Button type="primary" icon={<PlusOutlined></PlusOutlined>} key="2" onClick={ ()=>{ history.push("/modules/user/" + moduleId + "/add") } }>Add user</Button> : null}

        <Search key="1" placeholder="Search for..." onSearch={onSearch} allowClear enterButton />
      </Space>

    ]}>

    </PageHeader>

    
    {loading ? <Skeleton></Skeleton> : <Table rowKey="_id" dataSource={filteredUsers} columns={columns}  />}
    
    </Space>
    )
  



}