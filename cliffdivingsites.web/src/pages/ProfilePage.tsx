import React, { Fragment } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Container from '@material-ui/core/Container';
import {makeStyles} from "@material-ui/core/styles";
import {CssBaseline, Grid, Paper, Typography} from "@material-ui/core";
import {useAuth0} from "@auth0/auth0-react";

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
        height: 240,
    }
}));

const ProfilePage = () => {

    const classes = useStyles();
    const { user } = useAuth0();

    console.log(user)
    return (
        <Fragment>
            <CssBaseline/>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={classes.paper}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Profile
                            </Typography>
                            {user.name}
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={classes.paper}>

                        </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Your sites
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

            </Container>
        </Fragment>
    );
};

export default ProfilePage;