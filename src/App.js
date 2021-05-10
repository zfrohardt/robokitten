import React, {Component} from 'react';

import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Grid, Menu} from 'semantic-ui-react';

import {Link, Redirect, Route, Switch} from 'react-router-dom';
import RandomWords from 'random-words';

import SplashScreen from './components/SplashScreen';
import Game from './components/Game';
import Troops from './components/Troops';
import Enemies from './components/Enemies';
import Stats from './components/Stats';
import Error from './components/Error';

const API = 'http://localhost:3000';
const STD_URL_LENGTH = 3;

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            abilities: [],
            captains: [],
        };
    }

    componentDidMount() {
        this.populateDataFromServer('robots');
        this.populateDataFromServer('abilities');
        this.populateDataFromServer('captains');
    }

    getURLSeed() {
        return RandomWords({exactly: STD_URL_LENGTH, join: "-"});
    }

    populateDataFromServer = name => {
        fetch(`${API}/${name}`).then(resp => resp.json()).then(data => this.setState({[name]: data}));
    }

    render() {
        return (
            <div className="App">
                <Grid textAlign='center' style={{ height: '100vh' }} columns={1}>
                    <Grid.Row>
                        <Grid.Column verticalAlign="top">
                            <Menu>
                                <Menu.Item as={Link} to="/" >Home</Menu.Item>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column verticalAlign="middle" stretched>
                            <Switch>
                                <Route exact path="/" component={SplashScreen} />
                                <Route exact path="/play" render={() => <Redirect to={`/play/${this.getURLSeed()}`} />} />
                                <Route exact path="/play/:seed" render={(props) => <Game seed={props.match.params.seed} />} />
                                <Route exact path="/troops" render={() => <Troops robots={this.state.robots} abilities={this.state.abilities} />} />
                                <Route exact path="/enemies" component={Enemies} />
                                <Redirect exact from="/kittens" to="/enemies" />
                                <Route exact path='/statistics' component={Stats} />
                                <Route component={Error} status={404} />
                            </Switch>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column verticalAlign="bottom">
                            A GAME MADE BY TWO NON ROBOTS, <a href="https://github.com/moshriguez">MARC</a> AND <a href="https://github.com/zfrohardt">ZACH</a>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}