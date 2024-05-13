import {
  TRegisterData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi,
  TLoginData
} from '@api';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface IUserState {
  email: string;
  name: string;
  token: string;
  refreshToken: string;
  password: string;
  isLoading: boolean;
  isTryAuth: boolean;
  error?: string | null;
}

const initialState: IUserState = {
  email: '',
  name: '',
  token: '',
  refreshToken: '',
  password: '',
  isTryAuth: false,
  isLoading: true
};

export const fetchRegisterUser = createAsyncThunk(
  'user/registerUser',
  async function (data: TRegisterData) {
    return await registerUserApi(data);
  }
);

export const fetchLoginUser = createAsyncThunk(
  'user/loginUser',
  async function (data: TLoginData) {
    return await loginUserApi(data);
  }
);

export const fetchForgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async function (data: { email: string }) {
    return await forgotPasswordApi(data);
  }
);

export const fetchResetPassword = createAsyncThunk(
  'user/resetPassword',
  async function (data: { token: string; password: string }) {
    return await resetPasswordApi(data);
  }
);

export const fetchUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async function () {
    return await getUserApi();
  }
);

export const fetchUpdateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async function (data: Partial<TRegisterData>) {
    return await updateUserApi(data);
  }
);

export const fetchLogoutUser = createAsyncThunk(
  'user/logoutUser',
  async function () {
    localStorage.removeItem('token');
    return await logoutApi();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUserProfile: function (state) {
      return state;
    },
    selectUserName: function (state) {
      return state.name;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoading = false;
      });
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isTryAuth = true;
      });
    builder
      .addCase(fetchForgotPassword.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(fetchForgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchResetPassword.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(fetchResetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.isLoading = false;
      });
    builder
      .addCase(fetchUpdateUserProfile.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchUpdateUserProfile.rejected, (state, action) => {
        state.error = action.error?.message;
        console.log(action);
      })
      .addCase(fetchUpdateUserProfile.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        localStorage.setItem('userName', action.payload.user.name);
        state.isLoading = false;
      });
    builder
      .addCase(fetchLogoutUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchLogoutUser.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(fetchLogoutUser.fulfilled, (state, action) => {
        state.email = '';
        state.name = '';
        state.token = '';
        state.refreshToken = '';
        state.isLoading = false;
      });
  }
});

export const {} = userSlice.actions;
export const { selectUserProfile, selectUserName } = userSlice.selectors;
export const reducer = userSlice.reducer;
