import { SnackBarMessage } from "../../models/snackBar/snackBar";

export enum SnackBarActionTypes {
    SHOW_SNACK_BAR = '@@snackBar/SHOW_SNACK_BAR',
    HIDE_SNACK_BAR = '@@snackBar/HIDE_SNACK_BAR'
}

export const showSnackBar = (snackBarMessage: SnackBarMessage) => ({
    type: SnackBarActionTypes.SHOW_SNACK_BAR,
    payload: snackBarMessage

});

export const hideSnackBar = () => ({
    type: SnackBarActionTypes.HIDE_SNACK_BAR,
});
