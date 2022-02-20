import React from 'react';
import Weatherdata from '../Components/Weatherdata';
import '../Styles/Styles.css';

const CurrentLocation = ({ history }) => {
    const [latitude, setLat] = React.useState('');
    const [longitude, setLon] = React.useState('');
    const [todayData, setTodayData] = React.useState([]);
    const [tomorrowData, setTomorrowData] = React.useState([]);
    const [tomorrowDataButOneData, setTomorrowDataButOne] = React.useState([]);
    const date = new Date();
    const _dateObject = {
        getDay: date.getDate(),
        getMonth: (date.getMonth()+1),
        getYear: date.getFullYear()
    };
    let _dayObject = {
        today: '', tomorrow: '', tommorowButOne: ''
    }
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
        setLat(latitude);
        setLon(longitude);
        if (`${_dateObject.getMonth}`.length < 2) {
            _dayObject.today = `${_dateObject.getYear}-0${_dateObject.getMonth}-${_dateObject.getDay}`;
            _dayObject.tomorrow = `${_dateObject.getYear}-0${_dateObject.getMonth}-${_dateObject.getDay+1}`;
            _dayObject.tomorrowDataButOne = `${_dateObject.getYear}-0${_dateObject.getMonth}-${_dateObject.getDay+2}`;
        } else if (`${_dateObject.getDay}`.length < 2) {
            _dayObject.today = `${_dateObject.getYear}-${_dateObject.getMonth}-0${_dateObject.getDay}`;
            _dayObject.tomorrow = `${_dateObject.getYear}-${_dateObject.getMonth}-0${_dateObject.getDay+1}`;
            _dayObject.tomorrowDataButOne = `${_dateObject.getYear}-${_dateObject.getMonth}-0${_dateObject.getDay+2}`;
        } else {
            _dayObject.today = `${_dateObject.getYear}-${_dateObject.getMonth}-${_dateObject.getDay}`;
            _dayObject.tomorrow = `${_dateObject.getYear}-${_dateObject.getMonth}-${_dateObject.getDay+1}`;
            _dayObject.tomorrowDataButOne = `${_dateObject.getYear}-${_dateObject.getMonth}-${_dateObject.getDay+2}`;

        }
        setTodayData(data.days.filter((value, index, array) => {
            if (array[index].datetime === _dayObject.today) {
                return value;
            }
            return null;
        }));
        setTomorrowData(data.days.filter((value, index, array) => {
            if (array[index].datetime === _dayObject.tomorrow) {
                return value;
            }
            return null;
        }));
        setTomorrowDataButOne(data.days.filter((value, index, array) => {
            if (array[index].datetime === _dayObject.tomorrowDataButOne) {
                return value;
            }
            return null;
        }));
    }
    React.useEffect(() => {
        getPosition();
    } ,[]);
    return (
        <center>
            <h1>Your current location is at (lat, lon): ({latitude}, {longitude})</h1>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Weatherdata dateTitle={`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`} weatherDatas={todayData}/>
                <Weatherdata dateTitle={`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()+1}`} weatherDatas={tomorrowData}/>
                <Weatherdata dateTitle={`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()+2}`} weatherDatas={tomorrowDataButOneData}/>
            </div>
            <button type="button" onClick={() => {
                history.push("/searchpage");
            }} className="button-content">Back to search</button>
        </center>
    );
}

export default CurrentLocation;
