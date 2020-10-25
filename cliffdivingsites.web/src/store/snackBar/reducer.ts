import { AnyAction, Reducer } from 'redux'

import { SnackBarMessage } from '../../models/snackBar/snackBar'
import { SnackBarActionTypes } from './actions'

export interface SnackBarState {
    showSnackBar: boolean
    snackBarMessage?: SnackBarMessage
}

const initialState: SnackBarState = {
    showSnackBar: false,
    snackBarMessage: undefined
};

const reducer: Reducer<SnackBarState> = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SnackBarActionTypes.SHOW_SNACK_BAR: {
            return { ...state, showSnackBar: true, snackBarMessage: action.payload }
        }
        case SnackBarActionTypes.HIDE_SNACK_BAR: {
            return { ...state, showSnackBar: false, snackBarMessage: undefined }
        }
        default:
            return state
    }
}

export { reducer as snackBarReducer }
