import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Search from './Pages/Search';
import Results from './Pages/Results';
import './Styles/Styles.css';
import CurrentLocation from './Pages/CurrentLocation';
//Ush170+8
const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/searchpage" component={Search}/>
                    <Route path="/results/:city" component={Results}/>
                    <Route path="/currentLocation" component={CurrentLocation}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
