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
            gameplaySeed: rng(),
            warriors: [],
            setup: true,
        }
    }

    render() {
        // console.log(this.props.robots)
        return (
            (this.state.setup)? 
                <GameSetup captain={this.getCaptain()} robotChoices={this.getRandomRobots()} selectCallback={(robots) => this.selectWarriors(robots)} /> :
                <KillKittens seed={this.state.gameplaySeed} warriors={this.state.warriors} captain={this.getCaptain()} />
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
            let robot = this.getIndexFromRange(rng(), this.props.robots);
            robot.name = "Zach";
            randomRobots.push(robot);
        }

        if(randomRobots[0] === {}) {
            return [];
        }

        return randomRobots;
    }

    getCaptain() {
        let captain = this.getIndexFromRange(this.state.captainSeed, this.props.captains);
        captain.name = "Marc"
        return captain;
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