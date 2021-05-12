import React, {Component} from 'react';

import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Button, Grid, Menu} from 'semantic-ui-react';

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
            kittens: []
        };
    }

    componentDidMount() {
        this.populateDataFromServer('abilities');
        this.populateDataFromServer('captains');

        let abilitySort = (x, y) => {
            if (x.passive === y.passive) {
                return (x.name < y.name)? -1 : 1;
            }
            return (x.passive)? -1 : 1;
        }

        fetch(`${API}/abilities`).then(resp => resp.json())
            .then(abilities => {
                fetch(`${API}/robots`).then(resp => resp.json())
                    .then(robots => {
                        let mergedRobots = robots.map(robot => {
                            robot.abilities = abilities.filter(ability => robot.abilityIds.includes(ability.id));
                            robot.abilities = robot.abilities.sort(abilitySort);
                            return robot;
                        });
                        this.setState({
                            robots: mergedRobots,
                        })
                    }
                )

                // TODO: when kittens is a seperate endpoint, we can use this to join kitten abilities into the kitten objects
                fetch(`${API}/kittens`).then(resp => resp.json())
                    .then(kittens => {
                        let mergedKittens = kittens.map(kitten => {
                            kitten.abilities = abilities.filter(ability => kitten.abilityIds.includes(ability.id));
                            return kitten;
                        })
                        this.setState({
                            kittens: mergedKittens
                        })
                    }
                )
            }
        )
    }

    getURLSeed() {
        return RandomWords({exactly: STD_URL_LENGTH, join: "-"});
    }

    populateDataFromServer = name => {
        fetch(`${API}/${name}`).then(resp => resp.json()).then(data => this.setState({[name]: data}));
    }

    render() {
        console.log(this.state);
        return (
            <div className="App">
                <Grid textAlign='center' style={{ height: '100vh' }} columns={1}>
                    <Grid.Row>
                        <Grid.Column verticalAlign="top">
                            <Menu>
                                <Menu.Item>
                                    <Button content="Home" icon="home" as={Link} to="/" />
                                </Menu.Item>
                                <Menu.Item>
                                    <Button content="Source" icon="github" as='a' href="https://github.com/zfrohardt/robokitten" target="_blank" />
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column verticalAlign="middle" stretched>
                            <Switch>
                                <Route exact path="/" component={SplashScreen} />
                                <Route exact path="/play" render={() => <Redirect to={`/play/${this.getURLSeed()}`} />} />
                                <Route exact path="/play/:seed" render={(props) => <Game seed={props.match.params.seed} {...this.state}  />} />
                                <Route exact path="/troops" render={() => <Troops robots={this.state.robots} />} />
                                <Route exact path="/enemies" render={() => <Enemies kittens={this.state.kittens}/>} />
                                <Redirect exact from="/kittens" to="/enemies" />
                                <Route exact path='/statistics' component={Stats} />
                                <Route component={Error} status={404} />
                            </Switch>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column verticalAlign="bottom">
                            <span>A GAME MADE BY TWO NON ROBOTS, <a href="https://github.com/moshriguez">MARC</a> AND <a href="https://github.com/zfrohardt">ZACH</a></span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}