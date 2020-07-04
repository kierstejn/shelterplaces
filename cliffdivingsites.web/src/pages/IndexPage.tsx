import React, {FunctionComponent, useState, Fragment, useEffect} from 'react'
// @ts-ignore
import {useOktaAuth} from "@okta/okta-react";
import {Button, Icon, CssBaseline} from "@material-ui/core";
import {LocationRead} from "../models/location/LocationRead";
import GoogleMapReact, {ChildComponentProps, Coords, Maps, Point} from "google-map-react";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import Pin from '../components/map/Pin'
import LocationCard from "../components/map/LocationCard";
import MapMenu from "../components/map/MapMenu";
import {useAuth0} from "@auth0/auth0-react";
import config from "../config";

interface RightClickProps {
    coordinates: Coords
}

interface CoordinatesProps {
    lat: number,
    lng: number
}

const IndexPage: FunctionComponent = () => {

    const [selectedLocation, setSelectedLocation] = useState<LocationRead | null>(null);
    const [rightClick, setRightClick] = useState<RightClickProps | null>(null);
    const [coordinates, setCoordinates] = useState<CoordinatesProps>({lat: 40, lng: 0});
    const [zoom, setZoom] = useState(2);
    const { isAuthenticated } = useAuth0();


    const handleLocationSelect = (key: string, location: ChildComponentProps & LocationRead) => {
        if(rightClick){
            setRightClick(null)
        }
        setSelectedLocation(location)
    };

    const handleMapClick = () => {
        if(selectedLocation){
            setSelectedLocation(null)
        }
        if(rightClick){
            setRightClick(null)
        }
    };

    const data: LocationRead[] = [
        {
            id: "1",
            lat: 55.676098,
            lng: 12.568337
        },
        {
            id: "2",
            lat: 58.676098,
            lng: 13.568337
        }
    ];

    const locationPins = data.map((location, index) => {
        if (location.lat === null || location.lng === null) {
            return null
        } else {
            // @ts-ignore
            return <Pin
                key={index}
                lat={location.lat}
                lng={location.lng}
                location={location}
            />
        }
    });

    const handleApiLoaded = (map: any, maps: any) => {
        maps.event.addListener(map, "rightclick", function(event: any) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setCoordinates({lat: lat, lng: lng});
            setZoom(7);
            setSelectedLocation(null);
            setRightClick({coordinates: {lng: lng, lat: lat}});
        });

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                setCoordinates({lat: position.coords.latitude, lng: position.coords.longitude});
                setZoom(7);
            });
        }
    };



    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%' }} >
            <CssBaseline/>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: config.google.apiKey,
                    language: 'en'
                }}
                defaultCenter={{ lat: coordinates.lat, lng: coordinates.lng }}
                center={{ lat: coordinates.lat, lng: coordinates.lng}}
                defaultZoom={2}
                zoom={zoom}
                onChildClick={handleLocationSelect}
                onClick={handleMapClick}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
                {locationPins}
                {selectedLocation &&
                    <LocationCard lat={selectedLocation.lat} lng={selectedLocation.lng}/>
                }
                {rightClick && isAuthenticated &&
                    <MapMenu lat={rightClick.coordinates.lat} lng={rightClick.coordinates.lng}/>
                }
            </GoogleMapReact>
        </div>
    )
};



export default IndexPage;