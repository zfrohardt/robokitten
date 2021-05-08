import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Robot from './components/Robot';
import 'semantic-ui-css/semantic.min.css';
import { Card } from 'semantic-ui-react';

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
            <Card.Group itemsPerRow={3} >
                <Robot img={"https://robohash.org/VJ9.png?set=set1"} name={"Wall-E"} modelNumber={42} description={"They call me a killer robot, but I just want to find love"} attributes={attributes} />
                <Robot />
                <Robot />
                <Robot />
            </Card.Group>
        </div>
    );
}

// Routes:
//      Home
//      Game Screen
//      Seed
//      Browse Robots


export default App;
