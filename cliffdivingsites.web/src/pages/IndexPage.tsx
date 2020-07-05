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

    const watchPositionSuccess = (position: any) => {
        setPersonalCoordinates({lat: position.coords.latitude, lng: position.coords.longitude});
    };


    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                setCoordinates({lat: position.coords.latitude, lng: position.coords.longitude});
                setPersonalCoordinates({lat: position.coords.latitude, lng: position.coords.longitude});
                setZoom(7);
            });
            navigator.geolocation.watchPosition((position => watchPositionSuccess(position)))
        }
    });


    const handleApiLoaded = (map: any, maps: any) => {

        let mousedUp: boolean;
        let longHold: boolean;
        let drag: boolean;

        maps.event.addListener(map, "rightclick", function(event: any) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setSelectedLocation(null);
            setRightClick({coordinates: {lng: lng, lat: lat}});
        });

        //navigator.geolocation.watchPosition((position => watchPositionSuccess(position)));

        maps.event.addListener(map, 'mousedown', function(event: any){
            mousedUp = false;
            longHold = false;
            drag = false;
            setLongHold(false)
            setTimeout(function(){
                if(!mousedUp && !drag){
                    longHold = true;
                    const lat = event.latLng.lat();
                    const lng = event.latLng.lng();
                    setSelectedLocation(null);
                    setRightClick({coordinates: {lng: lng, lat: lat}});
                    setLongHold(true)
                }
            }, 500);
        });
        
        maps.event.addListener(map, 'mouseup', function(event: any){
            mousedUp = true;
        });

        maps.event.addListener(map, 'dragstart', function (event:any) {
            drag = true;
        })
    };

    const createMapOptions = (maps: any) => {
        return {
            panControl: false,
            mapTypeControl: false,
            scrollwheel: false,
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
                defaultZoom={2}
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