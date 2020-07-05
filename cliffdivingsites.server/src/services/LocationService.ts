import db from '../data/db';
import LocationCreate from "../models/location/LocationCreate";

export const createLocation = (location: LocationCreate): Promise<string> => {
    return db('location')
        .returning('id')
        .insert({
            user_id: '3d5905c9-9c80-4b7a-92c2-7cdb8d5a216b',
            lat: location.lat,
            lng: location.lng,
            display_name: location.displayName,
            title: location.title,
            description: location.description
        })
};