import {  publicRequest } from '@/configs/axiosConfig';
import { LoginParams, RegisterParams, ResetPasswordParams, VerifyMfaLoginParams } from '@/types/api-shared-types';

class AuthService {
  static login(data: LoginParams) {
    return publicRequest.post('/auth/login', data);
  }

  static register(data: RegisterParams) {
    return publicRequest.post('/auth/register', data);
  }

  static verifyEmail(token: string) {
    return publicRequest.post('/auth/public/verify-email', { token });
  }

  static forgotPassword(email: string) {
    return publicRequest.post('/auth/public/forgot-password', { email });
  }

  static resetPassword(data: ResetPasswordParams) {
    return publicRequest.post('/auth/public/reset-password', data);
  }
  static verifyMfaLogin(data: VerifyMfaLoginParams) {
    return publicRequest.post('/auth/public/verify-mfa', data);
  }
}

export default AuthService;
