import { Coords } from "google-map-react";

export enum MapActionTypes {
    SET_COORDINATES = '@@map/SET_COORDINATES',
    SET_ZOOM = '@@map/SET_ZOOM',

    SET_USER_COORDINATES = '@@map/SET_USER_COORDINATES',
}

export const setCoordinates = (coordinates: Coords) => ({
    type: MapActionTypes.SET_COORDINATES,
    payload: coordinates
});

export const setZoom = (zoom: number) => ({
    type: MapActionTypes.SET_ZOOM,
    payload: zoom
});

export const setUserCoordinates = (coordinates: Coords) => ({
    type: MapActionTypes.SET_USER_COORDINATES,
    payload: coordinates
});