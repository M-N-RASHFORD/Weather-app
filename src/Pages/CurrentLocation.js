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
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude}8%2C${longitude}?key=A89PC56MCH4AQE4YQL99XAAQW`);
        const data = await response.json();
        console.log(latitude, longitude, data);
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
