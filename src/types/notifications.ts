import { AxiosError } from 'axios';

export type NotificationType = 'success' | 'error';

export interface NotificationState {
  open: boolean;
  type: NotificationType;
  text?: string | string[];
}

export interface ActionOpenNotification {
  type: NotificationType;
  text?: string | string[];
  error?: AxiosError | null;
}
