import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

const Home = () => {
    const { authService, authState } = useOktaAuth();

    const login = async () => { authService.login('/'); };
    const logout = async () => { authService.logout('/'); };

    if(authState.isPending) {
        return <div>Loading...</div>;
    }

    if(!authState.isAuthenticated) {
        return (
            <div>
                <p>Not Logged in yet</p>
                <button onClick={login}>Login</button>
            </div>
        );
    }

    return (
        <div>
            <p>Logged in!</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Home;