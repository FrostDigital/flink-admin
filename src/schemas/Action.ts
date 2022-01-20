export interface Action {
  id: string;
  description?: string;
  arguments: ActionArguments[];
}

export interface ActionArguments {
  id: string;
  required: boolean;
  type: ActionArugmentType;
  default?: string;
}

export enum ActionArugmentType {
  text = "TEXT",
}

export interface ActionResponse {
  status: ActionReturnStatus;
  error?: string;
  data?: {
    [key: string]: any;
  };
}

export enum ActionReturnStatus {
  success = "SUCCESS",
  error = "ERROR",
}
