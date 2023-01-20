import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { notificationText } from '../constants/common';

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

const initialState: NotificationState = {
  open: false,
  type: 'success',
  text: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    openNotification(state, action: PayloadAction<ActionOpenNotification>) {
      let { error, text, type } = action.payload;
      if (error?.response?.status === 422) {
        text = Object.entries(
          // @ts-ignore
          (error.response.data?.errors as { [key: string]: string }) ||
            (error.response.data as { [key: string]: string })
        ).map((message) => {
          return `${message[0]} : ${message[1]}`;
        }, '');
      }
      state.open = true;
      state.type = type;
      state.text = text ? text : notificationText[type];
    },
    closeNotification(state) {
      state.open = false;
    },
  },
});

export const {
  openNotification,
  closeNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
