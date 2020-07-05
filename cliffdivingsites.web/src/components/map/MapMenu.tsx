import React, {FunctionComponent, useEffect, useState, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import axios from 'axios';
import { useHistory } from "react-router-dom";

import config from "../../config";
import {AddressGeoResult} from "../../models/address/AddressGeoResult";

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
    const history = useHistory();

    const [loadingAddress, setLoadingAddress] = useState<boolean>(false);
    const [address, setAddress] = useState<AddressGeoResult | null>(null);
    const [error, setError] = useState<boolean>(false);

    const handleClick = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
    };

    const handleCreateClicked = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
        history.push({
            pathname: '/sites/create',
            state: address
        })
    };

    useEffect(() => {
        setLoadingAddress(true);
        setAddress(null);
        setError(false);
        axios(`https://eu1.locationiq.com/v1/reverse.php?key=${config.locationIq.token}&lat=${lat.toString()}&lon=${lng.toString()}&format=json`)
            .then((res: any) => {
                console.log(res);
                setAddress(res.data);
                setLoadingAddress(false);
            })
            .catch((err) => {
                console.log(err);
                setError(true);
                setAddress({lat: lat.toString(), lon: lng.toString()});
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
                    {address && !error &&
                        <Typography variant="body2" component="p">
                            {address.display_name}
                        </Typography>
                    }
                    {address && error &&
                        <Fragment>
                            <Typography variant="body2" component="p">
                                {"No location service available"}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {`Latitude: ${address.lat}`}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {`Longtitude: ${address.lon}`}
                            </Typography>
                        </Fragment>
                    }
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        onClick={handleCreateClicked}
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