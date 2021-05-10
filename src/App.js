import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Robot from './components/Robot';
import 'semantic-ui-css/semantic.min.css';
import { Card } from 'semantic-ui-react';
import SplashScreen from './components/SplashScreen';
import Game from './components/Game';
import Browse from './components/Browse';
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

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={SplashScreen} />
                    <Redirect exact from="/play" to="/play/redirect-test" />
                    <Route exact path="/play/:seed" render={(props) => <Game seed={props.match.params.seed} />} />
                    <Route exact path="/troops" component={Browse} />
                    <Route exact path='/statistics' component={Stats} />
                    <Route component={Error} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
