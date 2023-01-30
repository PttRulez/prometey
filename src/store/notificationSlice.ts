import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notificationText } from '../constants/common';
import { notificationInitialState } from './initialState';
import { ActionOpenNotification } from '../types/notifications';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: notificationInitialState,
  reducers: {
    openNotification(state, action: PayloadAction<ActionOpenNotification>) {
      let { error, text, type } = action.payload;

      if (error?.response?.status === 422 || error?.status === 422) {
        text = Object.entries(
          // @ts-ignore
          (error.response?.data?.errors as { [key: string]: string }) ||
            (error.response?.data as { [key: string]: string }) ||
            //@ts-ignore
            error.data?.errors
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
