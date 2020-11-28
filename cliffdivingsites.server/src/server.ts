import express from 'express';
import {createLocation, getAllLocations} from "./services/LocationService";
import { validateLocationCreateModel } from "./middleware/validation/LocationCreateValidation";
import LocationRead from './models/location/LocationRead'

//Routes
import LocationRoutes from './routes/LocationRoutes';

let bodyParser = require('body-parser');
let cors = require('cors');

const server = express();
const port = process.env.PORT || 5000;
server.use(cors());
server.use(bodyParser.json());

server.use('/location', LocationRoutes);

// @ts-ignore
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});