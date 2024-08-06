import { getToken, logOut, saveTokens } from '@/utils/authUtils';
import axios, { AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BACKEND } from '.';
const privateRequest = axios.create({
  baseURL: BACKEND.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const publicRequest = axios.create({
  baseURL: BACKEND.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Add a request interceptor
privateRequest.interceptors.request.use(
  async(config) => {
    // if (checkRefreshTokenExpired()) {
    //   logOut();
    // }

    const { accessToken,refreshToken } = getToken();
    if(!accessToken && !refreshToken) logOut();

    if (accessToken && refreshToken) {
      const jwt = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      if (jwt && jwt.exp && jwt.exp < currentTime) {
        const resObj = await publicRequest.post(
          '/auth/refresh-token',
          null,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );
        console.log("🚀 ~ async ~ resObj:", resObj)
        if (resObj) {
          console.log('save new token')
          const newAccessToken = resObj.data.accessToken;
          saveTokens(newAccessToken, refreshToken);
          config.headers.Authorization = `Bearer ${newAccessToken}`
          return config;
        }
      }
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log("🚀 ~ error:", error)
    logOut();
    console.log('loggouting...')
    return Promise.reject(error);
  },
);

privateRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    console.log('🚀 ~ error:', error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken } = getToken();
      try {
        const resObj = await publicRequest.post(
          '/auth/refresh-token',
          null,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );
        const {accessToken} = resObj.data;
        if (accessToken && refreshToken) {
          saveTokens(accessToken, refreshToken);
        }
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return privateRequest(originalRequest);
      } catch (err) {
        console.log("🚀 ~ err:", err)
        // Refresh token request failed
        logOut();
      }
    }

    return Promise.reject(error);
  },
);


export { privateRequest, publicRequest };
