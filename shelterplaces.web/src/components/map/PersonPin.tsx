import React, {FunctionComponent} from 'react'
import {ChildComponentProps} from "google-map-react";
import PoolIcon from '@material-ui/icons/Pool';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import ts from "typescript/lib/tsserverlibrary";
import LocationRead from "../../models/location/LocationRead";
import Button from '@material-ui/core/Button';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: 'red',
            transform: 'translate(-50%, -50%)',
            fontSize: 11,
        }
    }),
);

type AllProps = ChildComponentProps;


const PersonPin: FunctionComponent<AllProps> = () => {
    const classes = useStyles();

    return (
        <FiberManualRecordIcon
            className={classes.root}
        >
        </FiberManualRecordIcon>
    )
};

export default PersonPin