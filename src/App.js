import './App.css';
import 'semantic-ui-css/semantic.min.css';

import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import RandomWords from 'random-words';

import SplashScreen from './components/SplashScreen';
import Game from './components/Game';
import Troops from './components/Troops';
import Enemies from './components/Enemies';
import Stats from './components/Stats';
import Error from './components/Error';

const attributes = [
    {
        name: "Quick Fire",
        details: "I am first",
    },
    {
        name: "Splash Damage",
        details: "I am second",
    },
    {
        name: "Kamikaze",
        details: "I am third",
    }
]

const STD_URL_LENGTH = 3;

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={SplashScreen} />
                    <Redirect exact from="/play" to={`/play/${getURLSeed()}`} />
                    <Route exact path="/play/:seed" render={(props) => <Game seed={props.match.params.seed} />} />
                    <Route exact path="/troops" component={Troops} />
                    <Route exact path="/enemies" component={Enemies} />
                    <Redirect exact from="/kittens" to="/enemies" />
                    <Route exact path='/statistics' component={Stats} />
                    <Route component={Error} />
                </Switch>
            </Router>
        </div>
    );
}

function getURLSeed() {
    var randomWords = require('random-words');
    return randomWords({exactly: STD_URL_LENGTH, join: "-"});
}

export default App;
