import React, {FunctionComponent, useState, Fragment, useEffect} from 'react'
import { CssBaseline } from "@material-ui/core";
import GoogleMapReact, {ChildComponentProps, Coords} from "google-map-react";
import {useAuth0} from "@auth0/auth0-react";

//Models
import {LocationRead} from "../models/location/LocationRead";

//Components
import Pin from '../components/map/Pin'
import LocationCard from "../components/map/LocationCard";
import MapMenu from "../components/map/MapMenu";

import config from "../config";
import PersonPin from "../components/map/PersonPin";

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
    const [personalCoordinates, setPersonalCoordinates] = useState<CoordinatesProps | null>(null);
    const [longHold, setLongHold] = useState(false);
    const [zoom, setZoom] = useState(2);
    const { isAuthenticated } = useAuth0();


    const handleLocationSelect = (key: string, location: any) => {
        if(rightClick && !longHold){
            setRightClick(null)
        }
        if(location.location){
            setSelectedLocation(location);
        }
    };

    const handleMapClick = (event: any) => {
        if(selectedLocation){
            setSelectedLocation(null)
        }
        if(rightClick && !longHold){
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

        let mousedUp: boolean;
        let longHold: boolean;
        let drag: boolean;
        let timeout: any;

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                setCoordinates({lat: position.coords.latitude, lng: position.coords.longitude});
                setPersonalCoordinates({lat: position.coords.latitude, lng: position.coords.longitude});
                setZoom(6);
            });
        }

        maps.event.addListener(map, "rightclick", function(event: any) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setSelectedLocation(null);
            setRightClick({coordinates: {lng: lng, lat: lat}});
        });

        //navigator.geolocation.watchPosition((position => watchPositionSuccess(position)));

        maps.event.addListener(map, 'mousedown', function(event: any){
            setLongHold(false)
            timeout = setTimeout(function(){
                if(!drag) {
                    const lat = event.latLng.lat();
                    const lng = event.latLng.lng();
                    setSelectedLocation(null);
                    setRightClick({coordinates: {lng: lng, lat: lat}});
                    setLongHold(true)
                }
            }, 500);
        });

        maps.event.addListener(map, 'mouseup', function(event: any){
            if(timeout){
                clearTimeout(timeout);
            }
        });

        maps.event.addListener(map, 'dragStart', function (event:any) {
            console.log('dragStart');
            clearTimeout(timeout);
        });

        maps.event.addListener(map, 'drag', function (event:any) {
            console.log('dragStart');
            drag = true;
            clearTimeout(timeout);
        });

        maps.event.addListener(map, 'dragend', function (event:any) {
            console.log('dragend');
            drag = false
        });

        maps.event.addListener(map, 'zoom_changed', function (event:any) {
            console.log('zoom_changed');
            clearTimeout(timeout);
        });
    };

    const createMapOptions = (maps: any) => {
        return {
            panControl: true,
            mapTypeControl: false,
            scrollwheel: true,
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}} >
            <CssBaseline/>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: config.google.apiKey,
                    language: 'en'
                }}
                defaultCenter={{ lat: 50, lng: 0 }}
                center={{ lat: coordinates.lat, lng: coordinates.lng }}
                defaultZoom={4}
                zoom={zoom}
                onClick={handleMapClick}
                onChildClick={handleLocationSelect}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                options={createMapOptions}

            >
                {locationPins}
                {selectedLocation &&
                    <LocationCard lat={selectedLocation.lat} lng={selectedLocation.lng}/>
                }
                {rightClick && isAuthenticated &&
                    <MapMenu lat={rightClick.coordinates.lat} lng={rightClick.coordinates.lng}/>
                }
                {personalCoordinates &&
                    <PersonPin lat={personalCoordinates.lat} lng={personalCoordinates.lng} />
                }
            </GoogleMapReact>
        </div>
    )
};



export default IndexPage;