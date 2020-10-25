import { AnyAction, Reducer } from 'redux'

import { MapActionTypes } from './actions'
import { Coords } from 'google-map-react';

export interface MapState {
    coordinates?: Coords
    zoom?: number
    userCoordinates?: Coords
}

const initialState: MapState = {
    coordinates: undefined,
    zoom: undefined,
    userCoordinates: undefined
};

const reducer: Reducer<MapState> = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case MapActionTypes.SET_COORDINATES: {
            return { ...state, coordinates: action.payload }
        }
        case MapActionTypes.SET_ZOOM: {
            return { ...state, zoom: action.payload }
        }
        case MapActionTypes.SET_USER_COORDINATES: {
            return { ...state, userCoordinates: action.payload }
        }
        default:
            return state
    }
}

export { reducer as mapReducer }
