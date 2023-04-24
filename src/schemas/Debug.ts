export default interface request {
  start: Date;
  end?: Date;
  method: string;
  path: string;
  headers?: { [key: string]: string };
  body?: any;
  response?: string;
}

export interface DebugRes {
  requests: request[];
  enabled: boolean;
}
