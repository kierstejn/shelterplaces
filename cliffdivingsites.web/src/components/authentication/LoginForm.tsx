import React, {FunctionComponent, useState} from 'react'
import {TextField, Button} from "@material-ui/core";
// @ts-ignore
import { useOktaAuth } from '@okta/okta-react';
// @ts-ignore
import OktaAuth from '@okta/okta-auth-js';

interface Props {
    issuer: string
}

type AllProps = Props;

const LoginForm: FunctionComponent<AllProps> = ({issuer}) => {

    const { authState, authService } = useOktaAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState();
    const [sessionToken, setSessionToken] = useState();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const oktaAuth = new OktaAuth({ issuer: issuer });
        oktaAuth.signIn({ username, password })
            .then((res: any) => {

                const sessionToken = res.sessionToken;
                setSessionToken(sessionToken);
                // sessionToken is a one-use token, so make sure this is only called once
                authService.redirect({ sessionToken });

            })
            .catch((err: any) => {
                console.log('Found an error', err)
                setPassword('');
                setUsername('');
                if(err.errorCode === "E0000001"){
                    setErrorMessage("Password og brugernavn er krævet")
                } else if(err.errorCode === "E0000004"){
                    setErrorMessage("Forkert password eller brugernavn")
                }

            });
    };

    const handleUsernameChange = (e: any) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    if (sessionToken) {
        // Hide form while sessionToken is converted into id/access tokens
        return null;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px'}}>
            <form style={{width: '400px',display: 'flex', flexDirection: 'column'}} noValidate>
                <TextField
                    required
                    id="username"
                    label="Username"
                    style={{marginBottom: '20px'}}
                    onChange={handleUsernameChange}
                    value={username}
                />
                <TextField
                    style={{marginBottom: '20px'}}
                    required
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handlePasswordChange}
                    value={password}
                />
                <Button
                    type={"submit"}
                    variant="contained"
                    color="primary"
                    onSubmit={handleSubmit}
                    onClick={handleSubmit}
                >
                    LOG IND
                </Button>
                {errorMessage &&
                    <div style={{marginTop: 10, color: "red", fontSize: "small"}}>
                        {errorMessage}
                    </div>
                }
            </form>
        </div>
    )
};


export default LoginForm;