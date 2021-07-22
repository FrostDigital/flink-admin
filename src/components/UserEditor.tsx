import { Button, Space, Skeleton, Select } from "antd"
import { useParams } from "react-router-dom"

import {  Input, Form } from "antd";


import { apiClient } from "../utils/api";
import { useState } from "react";
import { useEffect } from "react";


import { FullUser } from "../schemas/FullUser";

type initialValues = {
    [key : string] : any
  }

export const UserEditor = (props : any) => {
    
    const {onFinish, user } : { onFinish : () => void, user : FullUser } = props;

    const [loading, setLoading] = useState(true);

    const [initalData, setInitalData] = useState<initialValues>()
    
    const [profileSchema, setProfileSchema] = useState<any>();
  
    const { moduleId } = useParams<{moduleId : string}>()
    const client = new apiClient();

    const [form] = Form.useForm();

    function matchPasswords(rule: any, value: any, callback: (error?: string) => void) {
      return new Promise((resolve, reject) => {
        if (form.getFieldValue("password") !== value) {
          reject("Passwords must match");
        }else{
          resolve("");
        }
        
      })
    }



  useEffect(()=>{
    
    async function fetchData(){
       
       setProfileSchema(await client.userModuleGetProfileSchma(moduleId));

       const initialValues : initialValues = {};
       if(user != null){
          initialValues.username = user?.username;
          Object.keys(user.profile).forEach((pk) => {
              initialValues["profile_" + pk] = user.profile[pk];
          })

       }
       setInitalData(initialValues);


       setLoading(false);
    }
    
    fetchData();
  }, [])


  
    let profileFormItems : any[] = [];
    if(!loading){
      if(profileSchema != null){
        if(profileSchema?.properties != null){
          Object.keys(profileSchema?.properties).forEach((pk : string)=>{
            
              let prop = profileSchema?.properties[pk];
              if(prop.enum != null){

                var items : any[] = [];
                prop.enum.forEach((en : any)=>{
                  items.push(<Select.Option value={en} key={en}>{en}</Select.Option>)
                })
                profileFormItems.push( <Form.Item
                    label={pk}
                    name={"profile_" + pk}
                    key={"profile_" + pk}
                    rules={ profileSchema.required.includes(pk) ? [{ required: true, message: ''}] : []}
                  >
                  <Select>
                    {items}
                  </Select>
              </Form.Item>)


              }else{
                if(prop.type === "string"){
                profileFormItems.push( <Form.Item
                  label={pk}
                  name={"profile_" + pk}
                  key={"profile_" + pk}
                  rules={ profileSchema.required.includes(pk) ? [{ required: true, message: '' }] : []}
                >
                  <Input />
                </Form.Item>)
                }
              }

          })
        }
      }
    }


  return (<div>
  { loading ? <Skeleton></Skeleton> : <Space direction="vertical" style={{ width: "100%" }}>
    
  
      <Form
        name="basic"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        form={form}
        initialValues={initalData}
      
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input a username!' }]}
        >
          <Input />
        </Form.Item>

        { user == null &&
              <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input a password!' }]}
            >
              <Input />
            </Form.Item>
      }

      { user == null &&
              <Form.Item
              label="Password again"
              name="password2"
              rules={[{ validator: matchPasswords }]}
            >
              <Input />
            </Form.Item>
        }

      {profileFormItems}

        <Form.Item wrapperCol={{ offset: 3, span: 12 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    

    </Space>
  }
  </div>)
    





}