import React, {FunctionComponent, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {ButtonBaseActions, CircularProgress} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import {getAddressFromCoordinates} from "../../util/geocoder";

import axios from 'axios';
import config from "../../config";




const useStyles = makeStyles({
    card: {
        width: 230,
        position: 'absolute',
        left: 10,
        bottom: 30
    },
    icon: {
        position: 'relative',
        fontSize: 20,
        color: 'red',
        bottom: 5,
        left: 10
    },
    div: {
        display: 'flex',
        flexDirection: 'column-reverse',
        width: 250,
        minHeight: 120,
        position: 'absolute',
        left: -20,
        bottom: -15,
    }
});

interface Props {
    lat: number,
    lng: number
}



const MapMenu: FunctionComponent<Props> = ({lat, lng}) => {
    const classes = useStyles();

    const [loadingAddress, setLoadingAddress] = useState<boolean>(false);
    const [address, setAddress] = useState<string>('');

    const handleClick = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
    };

    useEffect(() => {
        setLoadingAddress(true);
        axios(`https://eu1.locationiq.com/v1/reverse.php?key=${config.locationIq.token}&lat=${lat.toString()}&lon=${lng.toString()}&format=json`)
            .then((res: any) => {
                console.log(res);
                setAddress(res.data.display_name);
                setLoadingAddress(false);
            })
    }, [lat, lng]);


    return (
        <div onClick={handleClick} className={classes.div}>
            <ClearIcon
                className={classes.icon}
            />
            <Card className={classes.card} raised onClick={handleClick}>

                <CardContent>
                    {loadingAddress && !address &&
                        <CircularProgress/>
                    }
                    {address &&
                        <Typography variant="body2" component="p">
                            {address}
                        </Typography>
                    }
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        onClick={handleClick}
                        disabled={!address || loadingAddress}
                    >
                        Create new site
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default MapMenu;