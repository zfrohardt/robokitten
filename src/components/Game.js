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
        // console.log(this.props.robots)
        return (
            (this.state.setup)? 
                <GameSetup captain={this.getCaptain()} robotChoices={this.getRandomRobots()} selectCallback={(robots) => this.selectWarriors(robots)} abilities={this.props.abilities}/> :
                <KillKittens warriors={this.state.warriors} captain={this.getCaptain()} />
        );
    }

    selectWarriors(robots) {
        console.log(robots)
        this.setState({
            warriors: robots,
            setup: false,
        })
    }

    getRandomRobots() {
        let rng = SeedRandom(this.state.randomRobotSeed);
        let randomRobots = [];

        for(let i = 0; i < 5; i++) {
            randomRobots.push(this.getIndexFromRange(rng(), this.props.robots));
        }

        if(randomRobots[0] === {}) {
            return [];
        }

        return randomRobots;
    }

    getCaptain() {
        return this.getIndexFromRange(this.state.captainSeed, this.props.captains);
    }

    getIndexFromRange(rand, arr) {
        if (arr.length === 0) {
            return {}
        }
        return arr[this.getNumberFromRange(rand, arr.length)];
    }
    

    getNumberFromRange(rand, upperBound) {
        return Math.floor(rand * upperBound);
    }
}