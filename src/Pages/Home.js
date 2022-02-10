import React from 'react';
import '../Styles/Styles.css';

const Home = ({ history }) => {
    return (
        <center>
            <h1>...a simple weather app.</h1>
            <p>Get to know the weather information of any city for the last 5 minutes..</p>
            <p></p>
            <button type="button" onClick={() => {history.push("/searchpage")}} className="button-content">Continue</button>
        </center>
    );
}

export default Home;
