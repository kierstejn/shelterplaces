import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import {makeStyles, Theme, useTheme} from '@material-ui/core/styles'
import { ApplicationState } from '../../store/index'
import { hideSnackBar } from '../../store/snackBar/actions'
import { MessageTypes, SnackBarMessage } from '../../models/snackBar/snackBar'

/**
 * Get the background color based on message type.
 * @param theme
 * @param toastMessage
 */
function getBackgroundColor(theme: Theme, snackBarMessage?: SnackBarMessage): string {
    if (!snackBarMessage) {
        return theme.palette.primary.main
    }
    switch (snackBarMessage.messageType) {
        case MessageTypes.Error: {
            return theme.palette.error.main
        }
        case MessageTypes.Warning: {
            return theme.palette.warning.main
        }
        case MessageTypes.Info: {
            return theme.palette.info.main
        }
        case MessageTypes.Success: {
            return theme.palette.success.main
        }
        default: {
            return theme.palette.primary.main
        }
    }
}

interface PropsFromDispatch {
    hideSnackBarAction: typeof hideSnackBar
}

interface PropsFromState {
    showSnackBar: boolean
    snackBarMessage?: SnackBarMessage
}

type allProps = PropsFromDispatch & PropsFromState

const useStyles = makeStyles((theme) => ({

}));

const Snack: FunctionComponent<allProps> = ({ showSnackBar, snackBarMessage, hideSnackBarAction }) => {
    function handleClose() {
        hideSnackBarAction()
    }
    const theme = useTheme();
    const classes = useStyles();

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            ContentProps={{
                style: { background: getBackgroundColor(theme, snackBarMessage) }
            }}

            open={showSnackBar}
            autoHideDuration={5000}
            onClose={handleClose}
            message={snackBarMessage?.message}
            action={
                <>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </>
            }
        />
    )
}

const mapStateToProps = ({ snackBar}: ApplicationState) => ({
    showSnackBar: snackBar.showSnackBar,
    snackBarMessage: snackBar.snackBarMessage,
});

const mapDispatchToProps = {
    hideSnackBarAction: hideSnackBar
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Snack)