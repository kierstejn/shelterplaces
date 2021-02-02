import React, { FunctionComponent, useState, Fragment, useEffect } from 'react'
import { CssBaseline } from "@material-ui/core";
import GoogleMapReact, { ChildComponentProps, Coords } from "google-map-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from 'lodash'
import {MapContainer, Popup, Marker, TileLayer} from 'react-leaflet'

//Models
import LocationRead from "../models/location/LocationRead";
import LocationDetail from "../models/location/LocationDetail";

//Redux
import { showSnackBar } from '../store/snackBar/actions'
import { ApplicationState } from '../store';

import axios from "../axios";
import { MessageTypes } from "../models/snackBar/snackBar";
import { useHistory, useLocation} from "react-router-dom";
import {LatLngTuple, LeafletMouseEvent, Map, LatLng} from "leaflet";

const IndexPage: FunctionComponent = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const [locationData, setLocationData] = useState<LocationRead[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<LocationDetail | null>(null);
    const [selectedLocationCoor, setSelectedLocationCoor] = useState<LatLng | null>(null);
    const [map, setMap] = useState<Map | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/location');
                setLocationData(response.data);
            } catch (e) {
                dispatch(showSnackBar({message: 'Error occurred!', messageType: MessageTypes.Error}));
            }
        };
        fetchData()
    }, [location.pathname]);

    const position: LatLngTuple = [51.505, -0.09];

    const getLocation = (id: string) => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/location/${id}`);
                setSelectedLocation(response.data);
                console.log(response.data);
            } catch (e) {
                dispatch(showSnackBar({message: 'Error occurred!', messageType: MessageTypes.Error}));
            }
        };
        fetchData()
    };

    const onMarkerClick = (event: LeafletMouseEvent, id: string) => {
        if(map){
            setSelectedLocationCoor(event.latlng);
            getLocation(id);
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}} >
            <MapContainer
                center={position}
                zoom={3}
                style={{width: '100%', height: '100%'}}
                whenCreated={(map: Map) => setMap(map)}
            >
                <TileLayer
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
                />
                {locationData && locationData.map((location, index) => {
                    return (
                    <Marker
                        key={`marker-${index}`}
                        position={[location.lat, location.lng]}
                        eventHandlers={{
                            click: (event: LeafletMouseEvent) => {
                                onMarkerClick(event, location.id)
                            }
                        }}
                    />)
                })}
                {selectedLocationCoor &&
                    <Popup
                        position={selectedLocationCoor}
                        eventHandlers={{
                            popupclose: () => {
                                setSelectedLocationCoor(null)
                            }
                        }}
                    >
                        {selectedLocation &&
                            <div>
                                <h2>{selectedLocation?.title}</h2>
                                <p>{selectedLocation?.displayName}</p>
                                <p>{selectedLocation?.description}</p>
                            </div>
                        }
                    </Popup>
                }
            </MapContainer>
        </div>
    )
};



export default IndexPage;