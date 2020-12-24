"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtCheck = void 0;
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
exports.jwtCheck = jwt({
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
//# sourceMappingURL=jwtCheck.js.map