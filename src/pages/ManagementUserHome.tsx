import { Button, PageHeader, Skeleton, Space, Table, } from "antd"
import { Link, useHistory, useParams } from "react-router-dom"

import {
    PlusOutlined
  } from '@ant-design/icons';
import { useEffect } from "react";
import { useState } from "react";
import { apiClient } from "../utils/api";
import { ManagementUser} from "../schemas/ManagementUser";


type userListState =  ManagementUser[];
const initalState : userListState = [];

export const ManagementUserHome = () =>{
    const { moduleId } = useParams<{moduleId : string}>()
    const history = useHistory();
    


    const [users, setUsers] = useState(initalState)
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchData(){
            const client  = new apiClient();
            const users = await client.managementUserList(moduleId);
            setUsers(users);
            setLoading(false);
        }
        fetchData();

    
    }, [moduleId]);



    const columns = [
        {
          title: 'Name',
          dataIndex: 'username',
          key: 'username',

        },
        {
            title: 'Action',
            width: '100px',
            key: 'action',
            render: (text : string, record : ManagementUser)=> (
              <Space size="middle">
                
                <Link to={"/modules/management_user/" +  moduleId + "/edit/" +  record._id}>Edit</Link>
              </Space>
            ),
          },

      ];



    return (<Space direction="vertical" style={{ width: "100%" }}><PageHeader
    className="site-page-header"
    ghost={false}
    title="Admin users"
    subTitle=""
    extra={[
      <Button key="1" type="primary" icon={<PlusOutlined />} onClick={ ()=>{ history.push("/modules/management_user/" + moduleId + "/add") } }>
        Add user
      </Button>,
    ]}></PageHeader>
    
    {loading ? <Skeleton></Skeleton> : <Table rowKey="_id" dataSource={users} columns={columns}  />}
    
    </Space>
    )
  



}