import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects'
// @ts-ignore
import { useOktaAuth } from '@okta/okta-react';
// @ts-ignore
import OktaAuth from '@okta/okta-auth-js';

import { AuthenticationActionTypes, loginSuccess, logoutSuccess } from './actions'

function* handleLogout() {
    yield put(logoutSuccess())
}

function* handleLogin() {
    yield put(loginSuccess())
}

function* watchLoginRequest() {
    yield takeEvery(AuthenticationActionTypes.LOGIN_REQUEST, handleLogin)
}

function* watchLogoutRequest() {
    yield takeEvery(AuthenticationActionTypes.LOGOUT_REQUEST, handleLogout)
}

function* authenticationSaga() {
    yield all([
        fork(watchLoginRequest),
        fork(watchLogoutRequest)
    ])
}

export default authenticationSaga