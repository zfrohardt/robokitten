import {React, Component} from 'react';
import SeedRandom from 'seedrandom';
import GameSetup from './GameSetup';
import KillKittens from './KillKittens'

export default class Game extends Component {
    constructor(props) {
        super(props);

        let rng = SeedRandom(props.seed);

        this.state = {
            captainSeed: rng(),
            randomRobotSeed: rng(),
            warriors: [],
            setup: true,
        }
    }

    render() {
        console.log(this.getNumberFromRange(this.state.captainSeed, this.props.captains.length));
        console.log(this.getRandomRobots());
        return (
            (this.state.setup)? 
                <GameSetup captain={this.getCaptain()} robotChoices={this.getRandomRobots()} selectCallback={this.selectWarriors} /> :
                <KillKittens warriors={this.state.warriors} captain={this.getCaptain()} />
        );
    }

    selectWarriors(robots) {
        this.setState({
            setup: false,
            warriors: robots,
        })
    }

    getRandomRobots() {
        let rng = SeedRandom(this.state.randomRobotSeed);
        let randomRobots = [];

        for(let i = 0; i < 5; i++) {
            randomRobots.push(this.getIndexFromRange(rng(), this.props.robots));
        }
        return randomRobots;
    }

    getCaptain() {
        return this.getIndexFromRange(this.state.captainSeed, this.props.captains);
    }

    getIndexFromRange(rand, arr) {
        return arr[this.getNumberFromRange(rand, arr.length)];
    }

    getNumberFromRange(rand, upperBound) {
        return Math.floor(rand * upperBound);
    }
}