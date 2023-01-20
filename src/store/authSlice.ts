import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';
import { AuthState, Credentials } from '../types/auth';
import { openNotification } from './notificationSlice';
import { AxiosError } from 'axios';

let initialState: AuthState = {
  authenticated: false,
  user: null,
  loading: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: Credentials, { dispatch, rejectWithValue }) => {
    const { email, password } = data;
    try {
      const response = await AuthService.login(email, password);
      dispatch(openNotification({ type: 'success', text: 'Вы залогинились' }));
      return response;
    } catch (e) {
      dispatch(
        openNotification({
          error: e as AxiosError,
          type: 'error',
          text: 'Вы НЕ залогинились',
        })
      );
      return rejectWithValue('Login faield');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
    } catch (e) {
      return rejectWithValue('Logout faield LOL');
    }
  }
);

export const refresh = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.refresh();
    } catch (e) {
      return rejectWithValue('Refresh faield LOL');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Omit<AuthState, 'loading'>>) => {
      return { ...action.payload, loading: false };
    },
    logout: (state, action) => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = true;
        state.user = action.payload.data.user;
        localStorage.setItem('token', action.payload.data.access_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.authenticated = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.authenticated = false;
        state.user = null;
        localStorage.removeItem('token');
      });
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
