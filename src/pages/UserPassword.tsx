import { Button, PageHeader, Space, message } from "antd"
import { useHistory, useParams } from "react-router-dom"
import { show, hide } from "../store/features/loading";
import { Card, Input, Form } from "antd";

import {
} from "react-router-dom";


import { apiClient } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";



export const UserPassword = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  
  const { moduleId, userId } = useParams<{moduleId : string,  userId : string}>()
  const client = new apiClient();

  const [form] = Form.useForm();
  
  
  const modules = useSelector( ( state : RootState ) => state.modules);
  const module = modules.all.find( p=>p.id === moduleId)
  const moduleName = module?.title;




  const onFinish = async (values: any) => {
    
    dispatch(show());
    
    try{
      await client.userModulePutPassword(moduleId, userId, values.password );
      message.success("Password changed");
      history.push("/modules/user/" +  moduleId + "/" + userId) ;
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

  function matchPasswords(rule: any, value: any, callback: (error?: string) => void) {
    return new Promise((resolve, reject) => {
      if (form.getFieldValue("password") !== value) {
        reject("Passwords must match");
      }else{
        resolve("");
      }
      
    })
  }




  return (
  <Space  direction="vertical" style={{ width: "100%" }}>
  <PageHeader
      className="site-page-header"
      ghost={false}
      title={moduleName}
      subTitle="Change password"
      onBack={() => history.goBack()}
      

    ></PageHeader>

    <Card>
      <Form
        name="basic"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        form={form}
      
      >
      <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input a password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Password again"
          name="password2"
          rules={[{ validator: matchPasswords }]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 3, span: 12 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>

    </Space>
)
    





}