import React, { FunctionComponent, useState, Fragment, useEffect } from 'react'
import { CssBaseline } from "@material-ui/core";
import GoogleMapReact, { ChildComponentProps, Coords } from "google-map-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from 'lodash'


//Models
import LocationRead from "../models/location/LocationRead";

//Components
import Pin from '../components/map/Pin'
import LocationCard from "../components/map/LocationCard";
import MapMenu from "../components/map/MapMenu";

//Redux
import { setCoordinates as setStoreCoordinates, setZoom as setStoreZoom } from '../store/map/actions'
import { showSnackBar } from '../store/snackBar/actions'
import { ApplicationState } from '../store';


import config from "../config";
import PersonPin from "../components/map/PersonPin";
import axios from "../axios";
import { MessageTypes } from "../models/snackBar/snackBar";
import { useHistory, useLocation} from "react-router-dom";


interface RightClickProps {
    coordinates: Coords
}

interface CoordinatesProps {
    lat: number,
    lng: number
}

const IndexPage: FunctionComponent = () => {

    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const storeCoordinates = useSelector((state: ApplicationState) => state.map.coordinates);
    const storeZoom = useSelector((state: ApplicationState) => state.map.zoom);

    const [selectedLocation, setSelectedLocation] = useState<LocationRead | null>(null);
    const [rightClick, setRightClick] = useState<RightClickProps | null>(null);
    const [coordinates, setCoordinates] = useState<CoordinatesProps>({lat: 40, lng: 0});
    const [personalCoordinates, setPersonalCoordinates] = useState<CoordinatesProps | null>(null);
    const [longHold, setLongHold] = useState(false);
    const [zoom, setZoom] = useState(2);

    const [locationData, setLocationData] = useState<LocationRead[]>([]);

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

    const locationPins = locationData.map((location, index) => {
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
        let drag: boolean;
        let timeout: any;
        // if ("geolocation" in navigator) {
        //     navigator.geolocation.getCurrentPosition(function(position) {
        //         setCoordinates({lat: position.coords.latitude, lng: position.coords.longitude});
        //         setPersonalCoordinates({lat: position.coords.latitude, lng: position.coords.longitude});
        //         setZoom(6);
        //     });
        // }

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
            clearTimeout(timeout);
        });

        maps.event.addListener(map, 'drag', function (event:any) {
            drag = true;
            clearTimeout(timeout);
        });

        maps.event.addListener(map, 'dragend', function (event:any) {
            drag = false
        });

        maps.event.addListener(map, 'zoom_changed', debounce(() => {
            clearTimeout(timeout);
            const zoom = map.getZoom();
            dispatch(setStoreZoom(zoom))
        }, 250));

        maps.event.addListener(map, 'bounds_changed', debounce(() => {
            const center = map.getCenter();
            const lat = center.lat();
            const lng = center.lng();
            dispatch(setStoreCoordinates({lat: lat, lng: lng}));
        }, 250));
    };

    useEffect(() => {
       if(storeCoordinates) {
           setCoordinates(storeCoordinates)
       }
       if(storeZoom){
           setZoom(storeZoom)
       }
    });


    const createMapOptions = (maps: any) => {
        return {
            panControl: true,
            mapTypeControl: false,
            scrollwheel: true,
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/location');
                setLocationData(response.data);
                console.log(response.data);
            } catch (e) {
                dispatch(showSnackBar({message: 'Error occurred!', messageType: MessageTypes.Error}));
            }
        };
        fetchData()
    }, [location.pathname]);

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