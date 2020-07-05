import express from 'express';
import {createLocation} from "./services/LocationService";
import {validateLocationCreateModel} from "./middleware/validation/LocationCreateValidation";
let bodyParser = require('body-parser');
let cors = require('cors');

const server = express();
const port = process.env.PORT || 5000;
server.use(cors());
server.use(bodyParser.json());


server.get('/', (req, res) => {
    res.send("hello")
});

server.post('/sites', validateLocationCreateModel, async (req, res) => {
    try {
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