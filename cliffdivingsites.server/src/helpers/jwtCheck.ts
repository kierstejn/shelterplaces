const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

export const jwtCheck = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-5leq0ojb.eu.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://cliffdivingsites/api',
    issuer: 'https://dev-5leq0ojb.eu.auth0.com/',
    algorithms: ['RS256']
});
