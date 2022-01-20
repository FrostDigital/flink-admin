import { Link, useHistory, useLocation, useParams, useRouteMatch  } from "react-router-dom"

import {
    WarningOutlined
  } from '@ant-design/icons';



import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Card, Input, PageHeader, Space, Form, Button,  Descriptions } from "antd";
import { Action, ActionResponse } from "../schemas/Action";
import { show, hide } from "../store/features/loading";
import { apiClient } from "../utils/api";
import React, { useRef, useState } from "react";




  const parseParams = (params = "") => {
    const rawParams = params.replace("?", "").split("&");
    const extractedParams : {[key: string]: any;} = {};
    rawParams.forEach((item) => {
      const kv = item.split("=");
      extractedParams[kv[0]] = kv[1];
    });
    return extractedParams;
  };


export const ActionExecute = () =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const { search } = useLocation();

    const { moduleId, actionId } = useParams<{moduleId : string,actionId : string}>()
    const [form] = Form.useForm();

    const query = parseParams(search);

    const [pageMode, setPageMode] = useState(1);
    const [response, setResponse] = useState<ActionResponse>();
    const [error, setError] = useState<string>();

    const modules = useSelector( ( state : RootState ) => state.modules);
    const module = modules.all.find( p=>p.id === moduleId)
    const moduleName = module?.title;
    

    const actions = module!.data.actions as Action[];
    const action = actions.find(p=>p.id === actionId);

    let defaultValues : {[key : string ] : any} = {};
    action?.arguments.forEach(a => {
        if(a.default!=null){
            defaultValues[a.id] = a.default;
        }
    })    

    const initialValues = {
        ...defaultValues,
        ...query
    }

    if(action == null){
        return (<Card>
            Action not found
        </Card>)
    }

    const onFinish = async (values: any) => {
        dispatch(show());

        try{
            const client = new apiClient();
            const resp = await  client.managementActionExecute(moduleId, actionId, values);
            setResponse(resp);
            setPageMode(2);
            setError("");
            dispatch(hide());

        }catch(ex){
            console.log(ex)
            setError(ex.toString());
            dispatch(hide());
        }

    };

    return (<Space direction="vertical" style={{ width: "100%" }}><PageHeader
    className="site-page-header"
    ghost={false}
    title={moduleName}
    subTitle={`${action.id} (${action.description})` }
    onBack={() => history.goBack()}
    >

    </PageHeader>
    {error && <Card>
        <WarningOutlined  style={{ fontSize: '48px', marginBottom : '20px', color: '#a00' }}/>
      
        <div>{error}</div>
    </Card>}
{pageMode == 1 && 
    <Card>
    <Form
     form={form}
     initialValues={initialValues}
      name="basic"
      onFinish={onFinish}
    >
        {
            action.arguments.map(arg => {
                return <Form.Item
                label={arg.id}
                name={arg.id}
                key={arg.id}
                rules={[{ required: arg.required, message: 'Please enter a value' }]}
              >
                <Input />
            </Form.Item>

            })
        }

      <Form.Item>
        <Button type="primary" htmlType="submit" >
          Execute {action.id} now
        </Button>
      </Form.Item>
    </Form>
    </Card>

    }

    {pageMode == 2 && 
        <Card>
                    {response && response?.data  &&   
          <Descriptions title="Action completed successfully" bordered column={1}>
              {Object.keys(response.data as Object).map((k)=>{
                return <Descriptions.Item label={k} key={k}>{response?.data![k]}</Descriptions.Item>
              })}
        </Descriptions>}
        </Card>

    }

    </Space>
    )



}





