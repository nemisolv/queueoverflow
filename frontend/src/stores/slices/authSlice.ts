//@ts-nocheck
import { PayloadAction } from '@reduxjs/toolkit';

import { LoginParams, RegisterParams, UpdateUserParams, VerifyMfaLoginParams } from '@/types/api-shared-types';
import { User } from '@/types/model-type';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';


interface AuthState {
  loading: boolean;
  currentUser?: User;
}

const initialState: AuthState = {
  currentUser: Cookies.get('user')
    ? JSON.parse(Cookies.get('user') as string)
    : null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginParams>) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
    },
    register: (state, action:PayloadAction<RegisterParams>) => {
      state.loading = true;
    },
    registerDone: (state) => {
      state.loading = false;
    },

    logout: (state) => {
      state.currentUser = undefined;
    },
    updateInfo: (state, action: PayloadAction<UpdateUserParams>) => {
      state.loading = false;
    },
    updateInfoSuccess: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      state.loading = false;
      Cookies.set('user', JSON.stringify(state.currentUser));
    },
    updateInfoFailure: (state) => {
      state.loading = false;
    },

    //  temp:(when we need to scale the app, We need to move this to a separate slice)
    enableMFA: (state, action: PayloadAction<boolean>) => {
      state.loading = true;
    },
    enableMFASuccess: (state, action: PayloadAction<boolean>) => {
      state.loading = false;
      state.currentUser = { ...state.currentUser, mfaEnabled: action.payload };
      Cookies.set('user', JSON.stringify(state.currentUser));
    },
    enableMFAFailure: (state) => {
      state.loading = false;
    },

    verifyMfa: (state, action: PayloadAction<VerifyMfaLoginParams >) => {
      state.loading = true;
    },
    verifyMfaSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    verifyMfaFailure: (state) => {
      state.loading = false;
    },

    changeUserAvatar: (state, action: PayloadAction<FormData>)  => {
      state.loading = true;
    },
    changeUserAvatarSuccess: (state, action: PayloadAction<string>) => {
      console.log("🚀 ~ action:", action)
      state.loading = false;
      state.currentUser = { ...state.currentUser, picture: action.payload };
      Cookies.set('user', JSON.stringify(state.currentUser));
    },
    changeUserAvatarFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailure,
  register,
  registerDone,
  logout,
  updateInfo,
  updateInfoSuccess,
  updateInfoFailure,
  enableMFA,
  enableMFASuccess,
  enableMFAFailure,
  verifyMfa,
  verifyMfaSuccess,
  verifyMfaFailure,
  changeUserAvatar,
  changeUserAvatarSuccess,
  changeUserAvatarFailure,
} = authSlice.actions;

export default authSlice.reducer;

export const getCurrentUserId = (state: RootState) => state.auth.currentUser?.id;