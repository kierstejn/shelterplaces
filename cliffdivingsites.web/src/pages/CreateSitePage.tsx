import React, {useEffect, useState, Fragment} from 'react';
import Container from '@material-ui/core/Container';
import {makeStyles} from "@material-ui/core/styles";
import {Button, CssBaseline, Grid, Paper, TextField, Typography} from "@material-ui/core";
import {useAuth0} from "@auth0/auth0-react";
import { useLocation } from 'react-router-dom';
import {AddressGeoResult} from "../models/address/AddressGeoResult";
import {useForm} from "react-hook-form";

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

interface FormInputs {
    title: string
    description: string
}

const CreateSitePage = () => {

    const classes = useStyles();
    const { user } = useAuth0();
    const location = useLocation();
    const { register, errors, handleSubmit } = useForm<FormInputs>();
    const [address, setAddress] = useState<AddressGeoResult | null>(null);

    const onSubmit = (data: any) => console.log(data);

    useEffect(() => {
        const state = location.state;
        // @ts-ignore
        setAddress(state)
    }, [location]);

    return (
        <Fragment>
            <CssBaseline/>
            <Container maxWidth="lg" className={classes.container}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Create new site
                        </Typography>
                        {address && address.display_name &&
                            <Typography variant="body2" component="p" gutterBottom>
                                {address?.display_name}
                            </Typography>
                        }
                        {address && !address.display_name &&
                            <Typography variant="body2" component="p">
                                {`Latitude: ${address.lat} - Longtitude: ${address.lon}`}
                            </Typography>
                        }
                        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                            <TextField
                                required
                                id="title"
                                label="Title"
                                variant="outlined"
                                ref={register}
                                name={'title'}
                                className={classes.inputField}
                                style={{marginTop: 10}}
                            />
                            <TextField
                                id="description"
                                label="Description"
                                multiline
                                name={'description'}
                                ref={register}
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