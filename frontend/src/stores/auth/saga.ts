import {  takeLatest } from 'redux-saga/effects';
import { handleChangeUserAvatar, handleLogin, handleRegister, handleUpdateProfile, handleVerifyMfaLogin } from './handle';
import { changeUserAvatar, login, register, updateInfo, verifyMfa } from '@/stores/slices/authSlice';

function* authSaga() {
  yield takeLatest <any>(login.type, handleLogin);
  yield takeLatest<any>(register.type,handleRegister);
  yield takeLatest<any> (updateInfo.type, handleUpdateProfile);
  yield takeLatest<any>(verifyMfa.type,handleVerifyMfaLogin);
  yield takeLatest<any>(changeUserAvatar.type, handleChangeUserAvatar);
}



export default authSaga;
