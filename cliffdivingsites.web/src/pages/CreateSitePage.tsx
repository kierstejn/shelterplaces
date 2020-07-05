import React, {useEffect, useState, Fragment} from 'react';
import Container from '@material-ui/core/Container';
import {makeStyles} from "@material-ui/core/styles";
import {Button, CssBaseline, Grid, Paper, TextField, Typography} from "@material-ui/core";
import {useAuth0} from "@auth0/auth0-react";
import { useLocation } from 'react-router-dom';
import {GeocodedAddress} from "../models/geocoding/GeocodedAddress";
import {useForm} from "react-hook-form";
import {GeocodedLocationResult} from "../models/geocoding/GeocodedLocationResult";

import axios from "../axios";
import LocationCreate from "../models/location/LocationCreate";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    inputField: {
        marginBottom: 20
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    submitButton: {
        width: 100
    }
}));

type FormData = {
    title: string;
    description: string;
};

const CreateSitePage = () => {

    const classes = useStyles();
    const { user } = useAuth0();
    const location = useLocation();
    const { register, errors, handleSubmit } = useForm<FormData>();
    const [geoLocation, setGeoLocation] = useState<GeocodedLocationResult | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string>('');

    useEffect(() => {
        const state = location.state;
        // @ts-ignore
        setGeoLocation(state)
    }, [location]);

    const onSubmit = async (formData: FormData) => {
        if(!geoLocation){
            return;
        }
        const data: LocationCreate = {
            lat: geoLocation.lat,
            lng: geoLocation.lat,
            displayName: geoLocation.address?.display_name,
            title: formData.title,
            description: formData.description
        };
        try {
            const response = await axios.post('/sites', data);
            console.log(response)
        } catch (e) {
            console.log(e)
        }

    };

    return (
        <Fragment>
            <CssBaseline/>
            <Container maxWidth="lg" className={classes.container}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Create new site
                        </Typography>
                        {geoLocation && geoLocation.address &&
                            <Typography variant="body2" component="p" gutterBottom>
                                {geoLocation.address.display_name}
                            </Typography>
                        }
                        {geoLocation && !geoLocation.address &&
                            <Typography variant="body2" component="p">
                                {`Latitude: ${geoLocation.lat} - Longtitude: ${geoLocation.lng}`}
                            </Typography>
                        }
                        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                            <TextField
                                required
                                id="title"
                                label="Title"
                                variant="outlined"
                                inputRef={register}
                                name={'title'}
                                className={classes.inputField}
                                style={{marginTop: 10}}
                            />
                            <TextField
                                required
                                id="description"
                                label="Description"
                                multiline
                                name={'description'}
                                inputRef={register}
                                rows={4}
                                variant="outlined"
                                className={classes.inputField}
                            />
                            <Button
                                type={'submit'}
                                color={'secondary'}
                                fullWidth={false}
                                variant={'contained'}
                                className={classes.submitButton}
                            >
                                Create
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Container>
        </Fragment>
    );
};

export default CreateSitePage;