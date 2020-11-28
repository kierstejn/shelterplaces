import React, {FunctionComponent} from 'react';
import {MapContainer, TileLayer} from "react-leaflet";
import {LatLngTuple} from "leaflet";

interface Props {
    position: LatLngTuple
    markers: Object[]
}

const Map: FunctionComponent<Props> = ({position}) => {
    return (
        <MapContainer center={position} zoom={13} style={{width: '100%', height: '100%'}}>
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
            />
        </MapContainer>
    );
};

export default Map;