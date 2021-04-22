import react from 'react';
import './BuyerHomePage.scss';
import {connect} from 'react-redux';
import {useEffect,useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { geolocated } from "react-geolocated";

const BuyerHomePage = ({buyer,history,isGeolocationEnabled,isGeolocationAvailable,coords}) => {


    useEffect(() => {
        if(!buyer.buyerData.isValidCredentials){
            history.push('/');
        }
    },[])
    return !isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : coords ? (
        <div className='buyer-home-page'>
            <div className='info-container'>
                <h1>Welcome buyer</h1>
            </div>
            <div className='map-container'>
                <MapContainer center={[coords.latitude,coords.longitude]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[coords.latitude,coords.longitude]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    ):(<div>Getting the location data</div>)
}


const mapStateToProps = (state) => ({
    buyer:state.buyer
})


export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(connect(mapStateToProps,null)(BuyerHomePage));