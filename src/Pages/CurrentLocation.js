import React from 'react';

const CurrentLocation = () => {
    const getPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Browser does not support geolocation");
        }
    }
    const showPosition = async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);
    }
    React.useEffect(() => {
        getPosition();
    } ,[]);
    return (
        <center>
            <h1>Your current location is makerere</h1>
        </center>
    );
}

export default CurrentLocation;
