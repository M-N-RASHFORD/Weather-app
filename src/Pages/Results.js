import React from 'react';
import Weatherdata from '../Components/Weatherdata';
import '../Styles/Styles.css';

const Results = ({ match, history }) => {
    const [todayData, setTodayData] = React.useState([]);
    const [tomorrowData, setTomorrowData] = React.useState([]);
    const [tomorrowDataButOne, setTomorrowDataButOne] = React.useState([]);
    const date = new Date();
    const getYear = date.getFullYear();
    const getMonth = (date.getMonth() + 1);
    const getDay = (date.getDay() + 6);
    const dateToday = `${getYear}-${getMonth}-${getDay}`;
    const dateTommorow = `${getYear}-${getMonth}-${getDay+1}`;
    const dateTommorowButOne = `${getYear}-${getMonth}-${getDay+2}`;
    /*const dateObject = {
        date: new Date(), getYear: date.getFullYear(), getMonth: (date.getMonth() + 1),
        getDay: (date.getDay() + 6), dateToday: `${getYear}-${getMonth}-${getDay}`,
        dateTommorow: `${getYear}-${getMonth}-${getDay+1}`, dateTommorowButOne: `${getYear}-${getMonth}-${getDay+2}`
    };*/
    const city = match.params.city;
    const weatherData = async (val) => {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=A89PC56MCH4AQE4YQL99XAAQW `);
        const data = await response.json();
        console.log(data);
        let getDate;
        let getTomorrow;
        let getDayAfterTomorrow;
        if (`${getMonth}`.length < 2) {
            getDate = `${getYear}-0${getMonth}-${getDay}`;
            getTomorrow = `${getYear}-0${getMonth}-${getDay+1}`;
            getDayAfterTomorrow = `${getYear}-0${getMonth}-${getDay+2}`
        } else if (`${getDay}`.length < 2) {
            getDate = `${getYear}-${getMonth}-0${getDay}`
            getTomorrow = `${getYear}-${getMonth}-0${getDay+1}`;
            getDayAfterTomorrow = `${getYear}-${getMonth}-0${getDay+2}`;

        } else {
            getDate = `${getYear}-${getMonth}-${getDay}`;
            getTomorrow = `${getYear}-${getMonth}-${getDay+1}`;
            getDayAfterTomorrow = `${getYear}-${getMonth}-${getDay+2}`;
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
