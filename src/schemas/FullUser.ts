import { User } from "./User";

export interface FullUser extends User{
    profile : {
        [key : string] : any
    }
}