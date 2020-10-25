import express from 'express';
import {createLocation} from "./services/LocationService";
import {validateLocationCreateModel} from "./middleware/validation/LocationCreateValidation";
let bodyParser = require('body-parser');
let cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const server = express();
const port = process.env.PORT || 5000;
server.use(cors());
server.use(bodyParser.json());

var jwtCheck = jwt({
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

server.use(jwtCheck);


server.get('/', (req, res) => {
    res.send("hello")
});

server.post('/sites', validateLocationCreateModel, async (req, res) => {
    try {
        console.log(req.body)
        const response: string = await createLocation(req.body);
        res.send(response[0])
    } catch (e) {
        res.send(e)
    }
});

// @ts-ignore
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});