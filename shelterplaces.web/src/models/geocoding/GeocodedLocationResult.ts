import {GeocodedAddress} from "./GeocodedAddress";

export interface GeocodedLocationResult {
    lat: number,
    lng: number,
    address?: GeocodedAddress
}