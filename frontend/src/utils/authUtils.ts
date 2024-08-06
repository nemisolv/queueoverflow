const access_token = 'stackoverflow_access_token';
const refresh_token= 'stackoverflow_refresh_token';

import Cookies from 'js-cookie';



export const saveTokens = (accessToken: string, refreshToken: string) => {
  if (accessToken && refreshToken)  {
    Cookies.set(access_token, accessToken);
    Cookies.set(refresh_token, refreshToken);
    
  }else {
    Cookies.remove(access_token);
    Cookies.remove(refresh_token);
  }
};

export const getToken = () => {
  return {
    accessToken: Cookies.get(access_token),
    refreshToken: Cookies.get(refresh_token),
  };
};

export const getAuth  = () => {
  return {
    // @ts-ignore
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : undefined
  }
}

export const logOut = (navigate?: (redirect:string) => void) => {
 
  // clear user cookie, token and refresh token
  Cookies.remove('user');
  Cookies.remove(access_token);
  Cookies.remove(refresh_token);

  if(navigate) {
    navigate('/auth/login')
  }else {
    window.location.href = '/auth/login';
  }
};
