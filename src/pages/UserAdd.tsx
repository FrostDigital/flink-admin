import {  PageHeader, Space, message, Card } from "antd"
import { useHistory, useParams } from "react-router-dom"
import { show, hide } from "../store/features/loading";

import { apiClient } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store/store";

import { UserEditor } from "../components/UserEditor";


export const UserAdd = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const client = new apiClient();
  
  const { moduleId } = useParams<{moduleId : string}>()  
  const modules = useSelector( ( state : RootState ) => state.modules);
  const module =  modules.all.find( p=>p.id === moduleId);
  const moduleName = module?.title;  
  
  
  const onFinish = async (values: any) => {
    
    dispatch(show());
    
    try{

      let profile : { [key : string ] : any } = {};
      Object.keys(values).filter((k) => k.startsWith("profile_")).forEach((k) => {
        profile[k.substr(8)] = values[k];
      })

       await client.userModulePost(moduleId,values.username, values.password, profile ) ;

      message.success("User created");
      history.push("/modules/user/" +  moduleId);
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


  return (<Space direction="vertical" style={{ width: "100%" }}>
    
  <PageHeader
      className="site-page-header"
      ghost={false}
      title={moduleName}
      subTitle={"Add new user"}
      onBack={() => history.goBack()}


    ></PageHeader>

    <Card>
      <UserEditor onFinish={onFinish}></UserEditor>

    </Card>

    </Space>
 )
    





}