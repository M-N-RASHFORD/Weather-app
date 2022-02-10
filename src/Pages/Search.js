import React from 'react';
import '../Styles/Styles.css';

const Search = ({ history }) => {
    const [city, setCity] = React.useState('');
    return (
        <center>
            <h1>Welcome tio the search page.</h1>
            <h1>Search for any city's weather information...</h1>
            <form onSubmit={(event) => {
                event.preventDefault();
                history.push(`/results/${city}`);
            }} style={{marginTop: '7pc'}}>
                <input type="text" onChange={(event) => setCity(event.target.value)}
                    placeholder="Enter city..." className="input-content"
                />
                <input type="submit" value="submit" disabled={!city || city.length < 3}
                    className="button-content"
                />
            </form>
        </center>
    );
}

export default Search;
