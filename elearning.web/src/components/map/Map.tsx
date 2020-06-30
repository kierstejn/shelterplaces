import React, {FunctionComponent, useState} from 'react'
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import GoogleMapReact from 'google-map-react';
import {Card} from "@material-ui/core";


const Map: FunctionComponent = ({children}) => {

    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(10);

    return (
        <GoogleMapReact
            bootstrapURLKeys={{
                key: 'AIzaSyCnJaUXeaK95zS4ivA7xTmlKaiuWA9Mf_k',
                language: 'en'
            }}
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
            {children}

        </GoogleMapReact>
    )
};

export default Map;