export interface NotificationRes {
  segments: MessagingSegment[];
  data: MessagingData[];
}

export interface MessagingSegment {
  id: string;
  description: string;
}

export interface MessagingTarget {
  userId: string;
  pushToken: string[];
}

export interface MessagingData {
  id: string;
  description: string;
  options?: string[];
}
export interface GetManagementModuleConfig {
  pluginId?: string;
  ui: boolean;
  uiSettings?: {
    title: string;
  };
  segments: MessagingSegment[];
  data?: MessagingData[];
}
