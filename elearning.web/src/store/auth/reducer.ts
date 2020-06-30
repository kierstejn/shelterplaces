import { Reducer } from 'redux'
import {AuthenticationActionTypes} from "./actions";


export interface AuthenticationState {
    isAuthenticated: boolean
    redirectTo?: string
}

const initialState: AuthenticationState = {
    isAuthenticated: false,
    redirectTo: undefined
};

const authenticationReducer: Reducer<AuthenticationState> = (state = initialState, action) => {
    switch (action.type) {
        case AuthenticationActionTypes.LOGIN_SUCCESS: {
            return { ...state, isAuthenticated: true }
        }
        case AuthenticationActionTypes.LOGOUT_SUCCESS: {
            return { ...state, isAuthenticated: false }
        }
        case AuthenticationActionTypes.SET_REDIRECT_URL: {
            return { ...state, redirectTo: action.payload }
        }
        default: {
            return state
        }
    }
};

export default authenticationReducer