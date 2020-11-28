import React, {FunctionComponent} from 'react'
import {ChildComponentProps} from "google-map-react";
import PoolIcon from '@material-ui/icons/Pool';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import ts from "typescript/lib/tsserverlibrary";
import LocationRead from "../../models/location/LocationRead";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: theme.palette.primary.main,
        },
        iconButton: {
            transform: 'translate(-50%, -50%)'
        }
    }),
);

interface Props {
   location: LocationRead
   onClick: (location: LocationRead) => void
}

type AllProps = ChildComponentProps & Props;


const Pin: FunctionComponent<AllProps> = ({location, onClick}) => {
    const classes = useStyles();



    return (
        <IconButton
            size={'small'}
            className={classes.iconButton}
            disableFocusRipple
            disableRipple
        >
            <PoolIcon
                className={classes.root}
            >
            </PoolIcon>
        </IconButton>
    )
};

export default Pin