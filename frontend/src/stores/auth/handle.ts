import Cookies from 'js-cookie';
import { saveTokens } from '@/utils/authUtils';
import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  changeUserAvatarSuccess,
  loginFailure,
  loginSuccess,
  registerDone,
  updateInfoFailure,
  updateInfoSuccess,
} from '../slices/authSlice';
import AuthService from '@/services/auth.service';
import {
  LoginParams,
  RegisterParams,
  UpdateUserParams,
  VerifyMfaLoginParams,
} from '@/types/api-shared-types';
import { toast } from 'react-toastify';
import UserService from '@/services/user.service';
import {
  updatePreviewUserAvatar,
  updatePreviewUserInfoSuccess,
} from '../slices/userSlice';
function* handleLogin({ payload }: { payload: LoginParams }): SagaIterator {
  try {
    const { email, password } = payload;
    const { navigate } = payload;
    const response = yield call(AuthService.login, { email, password });
    const { accessToken, refreshToken, userData, mfaEnabled, secretImageUri } =
      response.data;
    if (accessToken && refreshToken) {
      saveTokens(accessToken, refreshToken);
      yield put(loginSuccess(userData));
      // yield put(updateInfoSuccess(userData));
      Cookies.set('user', JSON.stringify(userData));
      if (navigate) {
        const from = payload?.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } else if (mfaEnabled && secretImageUri) {
      if (navigate) {
        navigate('/auth/verify-mfa', {
          state: {
            secretImageUri,
            email,
          },
        });
      }
    }
  } catch (error: PromiseRejectionEvent | any) {
    console.log('🚀 ~ function*handleLogin ~ error:', error);
    yield put(loginFailure('Login failed!'));
    toast.error(error.response.data.message);
  }
}

function* handleRegister({
  payload,
}: {
  payload: RegisterParams;
}): SagaIterator {
  try {
    const res = yield call(AuthService.register, payload);
    console.log('🚀 ~ res:', res);
    // check if status is 201
    if (res.status === 201) {
      toast.success('Please check your email to verify your account');
    }
  } catch (error: any) {
    console.log('🚀 ~ error:', error);
    toast.error(error.response.data.errors[0]);
  } finally {
    yield put(registerDone());
  }
}

export function* handleUpdateProfile({
  payload,
}: {
  payload: UpdateUserParams;
}): SagaIterator {
  try {
    yield call(UserService.updateProfile, payload);
    yield put(updateInfoSuccess(payload));
    yield put(updatePreviewUserInfoSuccess(payload));
    toast.success('Update profile successfully');
  } catch (error) {
    console.log('🚀 ~ function*handleUpdateProfile ~ error:', error);
    yield put(updateInfoFailure());
  }
}

export function* handleVerifyMfaLogin({
  payload,
}: {
  payload: VerifyMfaLoginParams;
}): SagaIterator {
  try {
    const { code, email } = payload;
    const { navigate } = payload;
    const response = yield call(AuthService.verifyMfaLogin, { code, email });
    const { accessToken, refreshToken, userData } = response.data;
    if (accessToken && refreshToken) {
      saveTokens(accessToken, refreshToken);
      yield put(loginSuccess(userData));
      Cookies.set('user', JSON.stringify(userData));
      if (navigate) {
        const from = '/';
        navigate(from, { replace: true });
      }
    }
  } catch (error: PromiseRejectionEvent | any) {
    console.log('🚀 ~ function*handleVerifyMfaLogin ~ error:', error);
    yield put(loginFailure('Login failed!'));
    toast.error(error.response.data.errors[0]);
  }
}

export function* handleChangeUserAvatar({
  payload,
}: {
  payload: FormData;
}): SagaIterator {
  try {
    const response = yield call(UserService.changeUserAvatar, payload);
    console.log("🚀 ~ response:", response)
    const userId = payload.get('userId');
    console.log("🚀 ~ userId:", userId)
    yield put(changeUserAvatarSuccess(response.data[0]));
    yield put(updatePreviewUserAvatar({
      picture: response.data[0],
      userId,
    }));
    toast.success('Avatar changed successfully');
  } catch (error: any) {
    console.log("🚀 ~ error:", error)
    toast.error("Can't upload image now")
  }
}

export { handleLogin, handleRegister };
