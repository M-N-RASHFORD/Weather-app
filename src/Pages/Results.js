import React from 'react';
import Weatherdata from '../Components/Weatherdata';
import '../Styles/Styles.css';

const Results = ({ match, history }) => {
    const [todayData, setTodayData] = React.useState([]);
    const [tomorrowData, setTomorrowData] = React.useState([]);
    const [tomorrowDataButOne, setTomorrowDataButOne] = React.useState([]);
    const dateObject = {
        date: new Date(), getYear: date.getFullYear(), getMonth: (date.getMonth() + 1),
        getDay: (date.getDay() + 6), dateToday: `${getYear}-${getMonth}-${getDay}`,
        dateTommorow: `${getYear}-${getMonth}-${getDay+1}`, dateTommorowButOne: ${getYear}-${getMonth}-${getDay+2}
    };
    const city = match.params.city;
    const weatherData = async (val) => {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=A89PC56MCH4AQE4YQL99XAAQW `);
        const data = await response.json();
        console.log(data);
        let getDate;
        let getTomorrow;
        let getDayAfterTomorrow;
        if (`${getMonth}`.length < 2) {
            getDate = `${dateObject.getYear}-0${dateObject.getMonth}-${dateObject.getDay}`;
            getTomorrow = `${dateObject.getYear}-0${dateObject.getMonth}-${dateObject.getDay+1}`;
            getDayAfterTomorrow = `${dateObject.getYear}-0${dateObject.getMonth}-${dateObject.getDay+2}`
        } else if (`${dateObject.getDay}`.length < 2) {
            getDate = `${dateObject.getYear}-${dateObject.getMonth}-0${dateObject.getDay}`
            getTomorrow = `${dateObject.getYear}-${dateObject.getMonth}-0${dateObject.getDay+1}`;
            getDayAfterTomorrow = `${dateObject.getYear}-${dateObject.getMonth}-0${dateObject.getDay+2}`;

        } else {
            getDate = `${dateObject.getYear}-${dateObject.getMonth}-${dateObject.getDay}`;
            getTomorrow = `${dateObject.getYear}-${dateObject.getMonth}-${dateObject.getDay+1}`;
            getDayAfterTomorrow = `${dateObject.getYear}-${dateObject.getMonth}-${dateObject.getDay+2}`;
        }
        const _todayData = data.days.filter((value, index, array) => {
            if (array[index].datetime === getDate) {
                return value;
            }
            return null;
        });
        setTodayData(_todayData);
        const _tomorrowData = data.days.filter((value, index, array) => {
            if (array[index].datetime === getTomorrow) {
                return value;
            }
            return null;
        });
        setTomorrowData(_tomorrowData);
        const _tomorrowDataButOne = data.days.filter((value, index, array) => {
            if (array[index].datetime === getDayAfterTomorrow) {
                return value;
            }
            return null;
        });
        setTomorrowDataButOne(_tomorrowDataButOne)
    }
    React.useEffect(() => {
        weatherData();
    }, []);
    return (
        <center>
            <p style={{fontWeight: 'bold'}}>Showing weather results for the city of</p>
            <h1>{city}</h1>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Weatherdata dateTitle={dateToday} weatherDatas={todayData}/>
                <Weatherdata dateTitle={dateTommorow} weatherDatas={tomorrowData}/>
                <Weatherdata dateTitle={dateTommorowButOne} weatherDatas={tomorrowDataButOne}/>
            </div>
            <div>
                <button type="button" onClick={() => {
                    history.push("/searchpage");
                }} className="button-content">Back to search</button>
                <button type="button" onClick={() => {
                    history.push("/currentLocation");
                }} className="button-content">Weather information for your current location</button>
            </div>
        </center>
    );
}

export default Results;
