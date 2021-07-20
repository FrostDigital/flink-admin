import { LoggedInUser } from "./LoggedInUser";
export type LoginResponse = {
    token : string;
    user :  LoggedInUser;
}

