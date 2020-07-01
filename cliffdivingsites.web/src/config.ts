const dev = {
    oidc: {
        clientId: '0oahhxwioSbJAzJSm4x6',
        issuer: 'https://dev-880092.okta.com/oauth2/default',
        redirectUri: 'http://localhost:3000/implicit/callback',
        scopes: ['openid', 'profile', 'email'],
        pkce: true
    }
};

const prod = {
    oidc: {
        clientId: '0oahhxwioSbJAzJSm4x6',
        issuer: 'https://dev-880092.okta.com/oauth2/default',
        redirectUri: 'https://keen-wiles-2fb95e.netlify.app/implicit/callback',
        scopes: ['openid', 'profile', 'email'],
        pkce: true
    }
};


const config = process.env.NODE_ENV === 'development' ? dev : prod;
export default config;