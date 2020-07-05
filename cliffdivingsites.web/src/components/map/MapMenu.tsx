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
import {GeocodedLocationResult} from "../../models/geocoding/GeocodedLocationResult";

const useStyles = makeStyles({
    card: {
        width: 230,
        position: 'absolute',
        left: 20,
        bottom: 40,
        zIndex: 100
    },
    icon: {
        position: 'relative',
        fontSize: 20,
        color: 'red',
        bottom: 15,
        left: 20
    },
    div: {
        display: 'flex',
        flexDirection: 'column-reverse',
        width: 280,
        minHeight: 170,
        position: 'absolute',
        left: -30,
        bottom: -25,
    }
});

interface Props {
    lat: number,
    lng: number
}

const MapMenu: FunctionComponent<Props> = ({lat, lng}) => {

    const classes = useStyles();
    const history = useHistory();

    const [isGeocoding, setIsGeocoding] = useState<boolean>(false);
    const [location, setLocation] = useState<GeocodedLocationResult | null>(null);
    const [error, setError] = useState<boolean>(false);

    const handleClick = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
    };

    const handleCreateClicked = (event: any) => {
        console.log('create clicked')
        event.stopPropagation();
        event.preventDefault();
        history.push({
            pathname: '/sites/create',
            state: location
        })
    };

    useEffect(() => {
        setIsGeocoding(true);
        setLocation(null);
        setError(false);
        axios(`https://eu1.locationiq.com/v1/reverse.php?key=${config.locationIq.token}&lat=${lat.toString()}&lon=${lng.toString()}&format=json`)
            .then((res: any) => {
                console.log(res);
                const location: GeocodedLocationResult = {
                    lat: lat,
                    lng: lng,
                    address: {...res.data}
                };
                setLocation(location);
                setIsGeocoding(false);
            })
            .catch((err) => {
                console.log(err);
                setError(true);
                setLocation({lat: lat, lng: lng});
                setIsGeocoding(false);
            })
    }, [lat, lng]);


    return (
        <div onClick={handleClick} className={classes.div}>
            <ClearIcon
                className={classes.icon}
            />
            <Card className={classes.card} raised onClick={handleClick}>

                <CardContent>
                    {isGeocoding && !location &&
                        <CircularProgress/>
                    }
                    {location && location.address && !error &&
                        <Typography variant="body2" component="p">
                            {location.address.display_name}
                        </Typography>
                    }
                    {location && error &&
                        <Fragment>
                            <Typography variant="body2" component="p">
                                {"No location service available"}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {`Latitude: ${lat}`}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {`Longtitude: ${lng}`}
                            </Typography>
                        </Fragment>
                    }
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        onClick={handleCreateClicked}
                        disabled={!location || isGeocoding}
                    >
                        Create new site
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default MapMenu;