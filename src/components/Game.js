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
                <GameSetup captain={this.getCaptain()} robotChoices={this.getRandomCombatants(this.props.robots, 5)} selectCallback={(robots) => this.selectWarriors(robots)} /> :
                <KillKittens warriors={this.state.warriors} captain={this.getCaptain()} kittens={this.getRandomCombatants(this.props.kittens, 3)} postVictories={this.postVictories} />
        );
    }

    selectWarriors(robots) {
        console.log(robots)
        this.setState({
            warriors: robots,
            setup: false,
        })
    }

    getRandomCombatants(robotsOrKittens, num) {
        let rng = SeedRandom(this.state.randomRobotSeed);
        let randomRobots = [];

        for(let i = 0; i < num; i++) {
            randomRobots.push(this.getIndexFromRange(rng(), robotsOrKittens));
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

    postVictories = (victoryObj) => {
        let configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(victoryObj)
        }
        fetch('http://localhost:3000/victories', configObj)
        .then(res => res.json())
        .then(console.log)
    }
}