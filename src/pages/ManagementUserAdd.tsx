import { Button, PageHeader, Space, message } from "antd"
import { useHistory, useParams } from "react-router-dom"
import { show, hide } from "../store/features/loading";
import { Card, Input, Form } from "antd";

import {
} from "react-router-dom";




import { apiClient } from "../utils/api";
import { useDispatch } from "react-redux";





export const ManagementUserAdd = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const { moduleId } = useParams<{moduleId : string}>()
  
  function matchPasswords(rule: any, value: any, callback: (error?: string) => void) {
    return new Promise((resolve, reject) => {
      if (form.getFieldValue("password") !== value) {
        reject("Passwords must match");
      }else{
        resolve("");
      }
      
    })
  }
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log("Finished")
    dispatch(show());
    const client = new apiClient();
    try{
      await client.managementUserAdd(moduleId, values.username, values.password);
      message.success("User added");
      history.push("/modules/management_user/" +  moduleId);
      dispatch(hide());
    }catch(ex){
      message.error(ex);
      dispatch(hide());
      
    }
    
  }


  return (<Space direction="vertical" style={{ width: "100%" }}>
    <PageHeader
      className="site-page-header"
      ghost={false}
      title="Add admin user"
      subTitle=""
      onBack={() => history.goBack()}
    ></PageHeader>

    <Card>
      <Form
        name="basic"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 12 }}
        form={form}
        onFinish={onFinish}
      
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input a username!' }]}
        >
          <Input />
        </Form.Item>

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