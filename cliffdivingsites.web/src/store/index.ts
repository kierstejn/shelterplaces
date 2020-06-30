import { combineReducers } from "redux";
import authenticationReducer, { AuthenticationState } from './auth/reducer'
import { all, fork} from 'redux-saga/effects'
import { History } from 'history'

//SAGAS
import authenticationSaga from "./auth/sagas";
import {connectRouter} from "connected-react-router";


export interface ApplicationState {
    authentication: AuthenticationState
}

export const createRootReducer = (history: History) =>
    combineReducers({
        authentication: authenticationReducer,
        router: connectRouter(history)
});

export function* rootSaga() {
    yield all([
        fork(authenticationSaga),

    ])
}
