export default {
    oidc: {
        clientId: '0oahhxwioSbJAzJSm4x6',
        issuer: 'https://dev-880092.okta.com/oauth2/default',
        redirectUri: 'http://localhost:3000/implicit/callback',
        scopes: ['openid', 'profile', 'email'],
        pkce: false
    }
}