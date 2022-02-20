import React from "react";
import moment from "moment";
import Weatherdata from "../Components/Weatherdata";
import "../Styles/Styles.css";
import loader from "../Images/loader.gif";

const Results = ({ match, history }) => {
  const [todayData, setTodayData] = React.useState([]);
  const [tomorrowData, setTomorrowData] = React.useState([]);
  const [tomorrowDataButOne, setTomorrowDataButOne] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const city = match.params.city;
  const today = moment().format("YYYY-MM-DD");
  const tomorrow = moment().add(1, "day").format("YYYY-MM-DD");
  const tomorrowButone = moment().add(2, "days").format("YYYY-MM-DD");
  const weatherData = () => {
    setLoading(true);
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=A89PC56MCH4AQE4YQL99XAAQW `
    )
      .then((res) => res.json())
      .then((data) => {
        const { days } = data;
        setTodayData(getData(days, today));
        setTomorrowData(getData(days, tomorrow));
        setTomorrowDataButOne(getData(days, tomorrowButone));
        setLoading(false);
      });
  };
  const getData = (data, day) => {
    const _todayData = data.find((value) => {
      if (moment(value.datetime).isSame(day)) {
        return value;
      }
    });
    return _todayData;
  };
  React.useEffect(() => {
    weatherData();
  }, []);
  return (
    <center>
      <p style={{ fontWeight: "bold" }}>
        Showing weather results for the city of
      </p>
      <h1>{city}</h1>
      {loading ? (
        <img src={loader} />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Weatherdata dateTitle={today} weatherData={todayData} />
          <Weatherdata dateTitle={tomorrow} weatherData={tomorrowData} />
          <Weatherdata
            dateTitle={tomorrowButone}
            weatherData={tomorrowDataButOne}
          />
        </div>
      )}
      <div>
        <button
          type="button"
          onClick={() => {
            history.push("/searchpage");
          }}
          className="button-content"
        >
          Back to search
        </button>
        <button
          type="button"
          onClick={() => {
            history.push("/currentLocation");
          }}
          className="button-content"
        >
          Weather information for your current location
        </button>
      </div>
    </center>
  );
};

export default Results;
