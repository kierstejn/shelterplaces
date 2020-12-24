import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyCnJaUXeaK95zS4ivA7xTmlKaiuWA9Mf_k");

// set response language. Defaults to english.
Geocode.setLanguage("en");



export const getAddressFromCoordinates = (lat: string, lng: string) => {
    Geocode.fromLatLng(lat, lng).then(
        response => {
            const address = response.results[0].formatted_address;
            console.log(address);
        },
        error => {
            console.error(error);
        }
    );
};

// Get geocoding from latitude & longitude.


// Get latitude & longitude from geocoding.
// Geocode.fromAddress("Eiffel Tower").then(
//     response => {
//         const { lat, lng } = response.results[0].geometry.location;
//         console.log(lat, lng);
//     },
//     error => {
//         console.error(error);
//     }
// );