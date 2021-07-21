import { Card, Input, Form, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { show, hide } from "../store/features/loading";
import { setLoggedin } from "../store/features/user";
import { apiClient  } from "../utils/api";
import config from "../config"
import "../styles/login.css";
import { useHistory } from "react-router-dom";
import { setModules } from "../store/features/modules";

export const Login = () =>{

    const dispatch = useDispatch();
    const history = useHistory();
    const onFinish = async (values: any) => {
        dispatch(show());

        try{
            const client = new apiClient();
            const resp = await  client.login(values.username, values.password);
            const modules = await client.managementApi();
            dispatch(setModules(modules));
            dispatch(setLoggedin(resp));
            dispatch(hide());
            history.push("/");


        }catch(ex){
            message.error('Invalid username or password. Please try again');
            dispatch(hide());
        }


    };
      
      
    return (<div className="loginPageContainer">
            <div className="loginCardContainer">
            <Card title={config.title + " / Login"}>

            <Form
      name="basic"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>



            </Card>
            </div>
    </div>)
}
