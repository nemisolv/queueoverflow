export const API_KEY = {
    TINY_EDITOR: import.meta.env.VITE_TINY_EDITOR_API_KEY,
}

export const BACKEND = {
    BASE_URL: import.meta.env.VITE_BASE_URL_API,
}

export const OAUTH2_REDIRECT_URI = import.meta.env.VITE_OAUTH2_REDIRECT_URI;

const baseURL_OAUTH2 = import.meta.env.VITE_BASE_URL_API_OAUTH

export const GOOGLE_AUTH_URL = baseURL_OAUTH2 + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = baseURL_OAUTH2 + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = baseURL_OAUTH2 + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;