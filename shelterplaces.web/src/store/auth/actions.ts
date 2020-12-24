
export enum AuthenticationActionTypes {
    LOGIN_REQUEST = '@@AUTHENTICATION/LOGIN_REQUEST',
    LOGIN_SUCCESS = '@@AUTHENTICATION/LOGIN_SUCCESS',
    LOGOUT_REQUEST = '@@AUTHENTICATION/LOGOUT_REQUEST',
    LOGOUT_SUCCESS = '@@AUTHENTICATION/LOGOUT_SUCCESS',
    SET_REDIRECT_URL = '@@AUTHENTICATION/SET_REDIRECT_URL'
}

export const loginRequest = () => ({
    type: AuthenticationActionTypes.LOGIN_REQUEST
});

export const loginSuccess = () => ({
    type: AuthenticationActionTypes.LOGIN_SUCCESS
});

export const logoutRequest = () => ({
    type: AuthenticationActionTypes.LOGOUT_REQUEST
});

export const logoutSuccess = () => ({
    type: AuthenticationActionTypes.LOGOUT_SUCCESS
});

export const setRedirectUrl = (url: string) => ({
    type: AuthenticationActionTypes.SET_REDIRECT_URL,
    payload: url
});