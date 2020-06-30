import React, {FunctionComponent, useState} from 'react'
// @ts-ignore
import {useOktaAuth} from "@okta/okta-react";
import {Button, Icon} from "@material-ui/core";
import Map from "../components/map/Map";
import {LocationRead} from "../models/location/LocationRead";
import GoogleMapReact, {ChildComponentProps, Point} from "google-map-react";

import Pin from '../components/map/Pin'
import LocationCard from "../components/map/LocationCard";

const IndexPage: FunctionComponent = () => {

    const { authState, authService } = useOktaAuth();

    const [selectedLocation, setSelectedLocation] = useState<LocationRead | null>(null);

    const handleLocationSelect = (key: string, location: ChildComponentProps & LocationRead) => {
        console.log(key);
        setSelectedLocation(location)
    };

    const handleMapClick = () => {
        if(selectedLocation){
            setSelectedLocation(null)
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

    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%' }} >
            {process.env.NODE_ENV}
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: 'AIzaSyCnJaUXeaK95zS4ivA7xTmlKaiuWA9Mf_k',
                    language: 'en'
                }}
                defaultCenter={{ lat: 55.676098, lng: 12.568337 }}
                center={{ lat: 55.676098, lng: 12.568337 }}
                defaultZoom={1}
                onChildClick={handleLocationSelect}
                onClick={handleMapClick}
            >
                {locationPins}
                {selectedLocation &&
                    <LocationCard lat={selectedLocation.lat} lng={selectedLocation.lng}/>
                }
            </GoogleMapReact>
        </div>
    )
};



export default IndexPage;