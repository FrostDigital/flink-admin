import { Button, PageHeader, Space, message, Skeleton, Modal } from "antd"
import { useHistory, useParams } from "react-router-dom"
import { show, hide } from "../store/features/loading";
import { Card, Input, Form } from "antd";

import {
} from "react-router-dom";


import { apiClient } from "../utils/api";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";


import {
  DeleteOutlined,
  KeyOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';


export const ManagementUserEdit = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  
  const { moduleId, userId } = useParams<{moduleId : string,  userId : string}>()
  const client = new apiClient();
  let initalData = useRef({});

  

  const onFinish = async (values: any) => {
    
    dispatch(show());
    
    try{
      await client.managemnetUserPut(moduleId, userId, { username : values.username } ) ;
      message.success("User updated");
      history.push("/modules/management_user/" +  moduleId);
      dispatch(hide());
    }catch(ex){
      if(typeof(ex) != "string"){
        message.error("Unknown error, please try again");
      }else{
        message.error(ex);
      } 
      
      dispatch(hide());
      
    }
    
  }



  const DeleteUser = () => {
    Modal.confirm({
      title: 'Delete user?',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you wish to remove this user?',
      okText: 'Yes',
      cancelText: 'No',
      onOk : DoDeleteUser
    })
  }
  const DoDeleteUser = async () => {
    dispatch(show());

    await client.managemnetUserDelete(moduleId, userId);
    message.success("User deleted");
    history.push("/modules/management_user/" +  moduleId);

    dispatch(hide());
  }


  useEffect(()=>{
    
    async function fetchData(){
       const user = await client.managementUserGet(moduleId, userId);
       initalData.current = user;
       setUsername(user.username);
       setLoading(false);
    }
    
    fetchData();
  }, [])


  return (<div>
  { loading ? <Skeleton></Skeleton> : <Space direction="vertical" style={{ width: "100%" }}>
    
  <PageHeader
      className="site-page-header"
      ghost={false}
      title="Edit admin user"
      subTitle={username}
      onBack={() => history.goBack()}
      extra={[
        <Button key="1" danger type="primary" icon={<DeleteOutlined />} onClick={ DeleteUser }>
          Delete
        </Button>,
        <Button key="2" type="primary" icon={<KeyOutlined />} onClick={ ()=>{ history.push("/modules/management_user/" + moduleId + "/edit/" + userId + "/password") } }>
        Change password
      </Button>,        
      ]}

    ></PageHeader>

    <Card>
      <Form
        name="basic"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        initialValues={initalData.current}
      
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 3, span: 12 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>

    </Space>
  }
  </div>)
    





}