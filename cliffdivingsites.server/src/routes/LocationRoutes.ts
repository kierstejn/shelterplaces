import {validateLocationCreateModel} from "../middleware/validation/LocationCreateValidation";
import {createLocation, getAllLocations, getLocation} from "../services/LocationService";
import LocationRead from "../models/location/LocationRead";
import {Response, Request} from 'express'
import {jwtCheck} from '../helpers/jwtCheck'

//Models
import LocationDetail from "../models/location/LocationDetail";
import LocationDB from "../models/location/LocationDB";

const routes = require('express').Router();

routes.post('/', validateLocationCreateModel, jwtCheck, async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const response: string = await createLocation(req.body);
        res.send(response[0])
    } catch (e) {
        res.send(e)
    }
});

routes.get('/', async (req: Request, res: Response) => {
    try {
        const response: LocationRead[] = await getAllLocations();
        res.send(response)
    } catch (e) {
        res.send(e)
    }
});

routes.get('/:locationId', async (req: Request, res: Response) => {
    try {
        const response: LocationDetail = await getLocation(req.params['locationId']);
        res.send(response)
    } catch (e) {
        res.send(e)
    }
});

export default routes;