import { combineReducers } from "redux";
import authenticationReducer, { AuthenticationState } from './auth/reducer'
import { all, fork} from 'redux-saga/effects'
import { History } from 'history'

//SAGAS
import authenticationSaga from "./auth/sagas";
import { connectRouter } from "connected-react-router";
import { snackBarReducer, SnackBarState } from "./snackBar/reducer";
import { MapState, mapReducer } from "./map/reducer";



export interface ApplicationState {
    authentication: AuthenticationState
    snackBar: SnackBarState
    map: MapState
}

export const createRootReducer = (history: History) =>
    combineReducers({
        authentication: authenticationReducer,
        router: connectRouter(history),
        snackBar: snackBarReducer,
        map: mapReducer
});

export function* rootSaga() {
    yield all([
        fork(authenticationSaga),

    ])
}
