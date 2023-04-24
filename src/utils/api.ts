import axios from "axios";
import { Module } from "../schemas/Module";
import config from "../config";
import { LoginResponse } from "../schemas/LoginResponse";
import store from "../store/store";
import { ManagementUser } from "../schemas/ManagementUser";
import { ManagementUserUpdate } from "../schemas/ManagementUserUpdate";
import { User } from "../schemas/User";
import { FullUser } from "../schemas/FullUser";
import { RepoInfo } from "../schemas/RepoInfo";
import { setAppOffline } from "../store/features/loading";
import { ViewUser } from "../schemas/ViewUser";
import { ActionResponse } from "../schemas/Action";
import { DebugRes } from "../schemas/Debug";
import { NotificationRes } from "../schemas/Notification";

export interface requestBody {
  [key: string]: any;
}

export class apiClient {
  baseUrl: string;
  constructor() {
    this.baseUrl = config.api;
  }

  async repoModuleGetDocuments(
    moduleId: string,
    page: number,
    page_size: number,
    sort: string | null,
    direction: string | null
  ): Promise<any[]> {
    return (
      await this.get(
        "/" +
          moduleId +
          "/documents/" +
          page +
          "?size=" +
          page_size +
          "&sort=" +
          sort +
          "&direction=" +
          direction
      )
    ).data.data.items as any[];
  }

  async repoModuleGet(moduleId: string): Promise<RepoInfo> {
    return (await this.get("/" + moduleId)).data.data as RepoInfo;
  }

  async userModuleGetProfileSchma(moduleId: string): Promise<any> {
    return (await this.get("/" + moduleId + "/profile/schema")).data.data;
  }

  async userModulePutProfile(
    moduleId: string,
    userId: string,
    profile: { [key: string]: any }
  ): Promise<void> {
    await this.put("/" + moduleId + "/profile/" + userId + "/append", profile);
  }

  async getNotification(moduleId: string): Promise<NotificationRes> {
    return (await this.get("/" + moduleId + "/")).data.data as NotificationRes;
  }

  async sendNotification(moduleId: string, values : any): Promise<void> {
    let { segment, subject, body, ...data }  = values

    return (await this.post("/" + moduleId + "/message", {
      segment,
      subject, 
      body,
      data
    })).data.data as void;
  }  

  async getDebug(moduleId: string): Promise<DebugRes> {
    return (await this.get("/" + moduleId + "/")).data.data as DebugRes;
  }  

  async setDebugEnabled(moduleId: string): Promise<void> {
    await this.post("/" + moduleId + "/enable");
  }
  async setDebugDisabled(moduleId: string): Promise<void> {
    await this.post("/" + moduleId + "/disable");
  }

  async userModulePutPassword(
    moduleId: string,
    userId: string,
    password: string
  ): Promise<void> {
    await this.put("/" + moduleId + "/password/" + userId, { password });
  }

  async userModulePutUsername(
    moduleId: string,
    userId: string,
    username: string
  ): Promise<void> {
    await this.put("/" + moduleId + "/username/" + userId, { username });
  }

  async userModuleDelete(moduleId: string, userId: string): Promise<void> {
    await this.delete("/" + moduleId + "/" + userId);
  }

  async userModuleGet(moduleId: string, userId: string): Promise<FullUser> {
    return (await this.get("/" + moduleId + "/" + userId)).data
      .data as FullUser;
  }

  async userModuleGetView(moduleId: string, userId: string): Promise<ViewUser> {
    return (await this.get("/" + moduleId + "/" + userId + "/view")).data
      .data as ViewUser;
  }

  async userModulePost(
    moduleId: string,
    username: string,
    password: string,
    profile: { [key: string]: any }
  ): Promise<FullUser> {
    return (
      await this.post("/" + moduleId, {
        username,
        password,
        profile,
        authentificationMethod: "password",
      })
    ).data.data as FullUser;
  }

  async userModuleList(moduleId: string): Promise<User[]> {
    return (await this.get("/" + moduleId)).data.data.users as User[];
  }

  async managemnetUserPut(
    moduleId: string,
    userId: string,
    data: Partial<ManagementUserUpdate>
  ): Promise<void> {
    await this.put("/" + moduleId + "/" + userId, data);
  }

  async managemnetUserDelete(moduleId: string, userId: string): Promise<void> {
    await this.delete("/" + moduleId + "/" + userId);
  }

  async managementUserGet(
    moduleId: string,
    userId: string
  ): Promise<ManagementUser> {
    return (await this.get("/" + moduleId + "/" + userId)).data
      .data as ManagementUser;
  }
  async managementUserList(moduleId: string): Promise<ManagementUser[]> {
    return (await this.get("/" + moduleId)).data.data.users as ManagementUser[];
  }
  async managementUserAdd(
    moduleId: string,
    username: string,
    password: string
  ): Promise<ManagementUser> {
    const resp = (await this.post("/" + moduleId, { username, password })).data
      .data as ManagementUser;
    return resp;
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    return (await this.post("/managementapiuser/login", { username, password }))
      .data.data as LoginResponse;
  }
  async me(token: string): Promise<LoginResponse> {
    return (await this.get("/managementapiuser/me", token)).data
      .data as LoginResponse;
  }
  async managementApi(): Promise<Module[]> {
    return (await this.get("")).data.data.modules as Module[];
  }

  async managementActionExecute(
    moduleId: string,
    actionId: string,
    args: any
  ): Promise<ActionResponse> {
    const resp = (await this.post("/" + moduleId + "/" + actionId, args)).data
      .data as ActionResponse;
    return resp;
  }

  async get(url: string, token?: string): Promise<any> {
    return await this.call(url, "get", undefined, token);
  }
  async post(url: string, body?: requestBody, token?: string): Promise<any> {
    return await this.call(url, "post", body, token);
  }
  async delete(url: string, token?: string): Promise<any> {
    return await this.call(url, "delete", undefined, token);
  }
  async put(url: string, body?: requestBody, token?: string): Promise<any> {
    return await this.call(url, "put", body, token);
  }

  async call(
    url: string,
    method: "get" | "post" | "delete" | "put",
    body?: requestBody,
    token?: string
  ) {
    const state = store.getState();

    let config: any = {
      method: method,
      url: this.baseUrl + url,
      data: body,
      headers: {},
    };
    if (token) {
      config.headers["management-token"] = token;
    } else if (state.user.loggedIn) {
      config.headers["management-token"] = state.user.token;
    }
    try {
      const resp = await axios(config);
      return resp;
    } catch (ex) {
      console.log(ex);
      if (!ex.response?.status) {
        store.dispatch(setAppOffline());
        console.log("Network is down");
        return;
      }
      if (ex.response) {
        throw ex.response.data?.error?.detail;
      } else {
        throw new Error("Unknonw error");
      }
    }
  }
}
