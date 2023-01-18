import { Alert, Snackbar } from '@mui/material';
import React, { FC } from 'react';
import { RootState } from '../../store/store';
import { closeNotification } from '../../store/notificationSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const Notification: FC = () => {
  const { open, type, text } = useAppSelector(
    (state: RootState) => state.notification
  );
  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeNotification());
  };

  const createText = (text: string | string[] | undefined) => {
    if (Array.isArray(text)) {
      return text.map((message) => {
        return <p key={message}>{message}</p>;
      });
    }
    return text;
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        severity={type}
        elevation={6}
        variant="filled"
        onClose={handleClose}
      >
        {createText(text)}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
