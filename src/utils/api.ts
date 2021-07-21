import axios from "axios";
import { Module } from "../schemas/Module";
import config from "../config"
import { LoginResponse } from "../schemas/LoginResponse";
import store from '../store/store';
import { ManagementUser } from "../schemas/ManagementUser";
import { ManagementUserUpdate } from "../schemas/ManagementUserUpdate";
import { User } from "../schemas/User";
import { FullUser } from "../schemas/FullUser";

export interface requestBody{
    [key : string] : string
};

export class apiClient{
    
    baseUrl : string;
    constructor(){
        this.baseUrl = config.api;
    }
    
    async userModulePutPassword(moduleId : string, userId : string, password : string ) : Promise<void>{
        await this.put("/" + moduleId + "/password/" + userId, { password })
    }

    async userModulePutUsername(moduleId : string, userId : string, username : string ) : Promise<void>{
        await this.put("/" + moduleId + "/username/" + userId, { username })
    }

    async userModuleGet(moduleId : string, userId : string) : Promise<FullUser>{
        return (await this.get("/" + moduleId + "/" + userId)).data.data as FullUser
    }


    async userModuleList(moduleId : string) : Promise<User[]>{
        return (await this.get("/" + moduleId)).data.data.users as User[]
    }
    
    async managemnetUserPut(moduleId : string, userId : string, data : Partial<ManagementUserUpdate>) : Promise<void>{
        await this.put("/" + moduleId + "/" + userId, data)
    }

    async managemnetUserDelete(moduleId : string, userId : string) : Promise<void>{
        await this.delete("/" + moduleId + "/" + userId)
    }
    
    async managementUserGet(moduleId : string, userId : string) : Promise<ManagementUser>{
        return (await this.get("/" + moduleId + "/" + userId)).data.data as ManagementUser;
    }
    async managementUserList(moduleId : string) : Promise<ManagementUser[]>{
        return (await this.get("/" + moduleId)).data.data.users as ManagementUser[]
    }
    async managementUserAdd(moduleId : string, username : string, password : string) : Promise<ManagementUser>{
        const resp = (await this.post("/" + moduleId, { username, password})).data.data as ManagementUser;
        return resp;
        
    }

    async login(username : string, password : string) : Promise<LoginResponse>{
        return (await this.post("/managementapiuser/login", { username, password})).data.data as LoginResponse
    }
    async me(token : string) : Promise<LoginResponse>{
        return (await this.get("/managementapiuser/me", token)).data.data as LoginResponse;
    }
    async managementApi() : Promise<Module[]>{
        return (await this.get("")).data.data.modules as Module[]
    }

    async get(url : string, token? : string) : Promise<any>{
        return await this.call(url, "get", undefined, token);
    }
    async post(url : string, body? : requestBody, token? : string) : Promise<any>{
        return await this.call(url, "post", body, token);

    }
    async delete(url : string, token? : string) : Promise<any> {
        return await this.call(url, "delete", undefined, token);
    }
    async put(url : string, body? : requestBody, token? : string) : Promise<any>{
        return await this.call(url, "put", body, token);
    }

    async call(url : string, method : "get" | "post" | "delete" | "put",  body? : requestBody, token? : string){
        const state = store.getState();

        let config : any = {
            method: method,
            url: this.baseUrl + url,
            data: body,
            headers : {}
          }
        if(token){
            config.headers["management-token"] = token;
        }else if(state.user.loggedIn){
            config.headers["management-token"] = state.user.token;
        }     
        try{     
            const resp = await axios(config);
            return resp;
        }catch(ex){
            if( ex.response ){
                throw ex.response.data?.error?.detail;
            }

        }

    }

}