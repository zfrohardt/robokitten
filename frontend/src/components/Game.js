import {React, Component} from 'react';
import SeedRandom from 'seedrandom';
import { uniqueNamesGenerator, names } from 'unique-names-generator';
import GameSetup from './GameSetup';
import KillKittens from './KillKittens'

export default class Game extends Component {
    constructor(props) {
        super(props);

        let rng = SeedRandom(props.seed);

        this.state = {
            robotCaptainSeed: rng(),
            kittenCaptainSeed: rng(),
            randomRobotSeed: rng(),
            randomKittenSeed: rng(),
            gameplaySeed: rng(),
            warriors: [],
            setup: true,
        }
    }

    render() {
        // console.log(this.props.robots)
        return (
            (this.state.setup)? 
                <GameSetup robotCaptain={this.getCaptain(this.state.robotCaptainSeed)} robotChoices={this.getRandomCombatants(this.props.robots, this.state.randomRobotSeed, 5)} selectCallback={(robots) => this.selectWarriors(robots)} /> :
                <KillKittens warriors={this.state.warriors} robotCaptain={this.getCaptain(this.state.robotCaptainSeed)} kittens={this.getRandomCombatants(this.props.kittens, this.state.randomKittenSeed, 3)} kittenCaptain={this.getCaptain(this.state.kittenCaptainSeed)} postVictories={this.postVictories} />
        );
    }

    selectWarriors(robots) {
        console.log(robots)
        this.setState({
            warriors: robots,
            setup: false,
        })
    }

    getRandomCombatants(combatants, seed, num) {
        let rng = SeedRandom(seed);
        let randomCombatants = [];

        for(let i = 0; i < num; i++) {
            randomCombatants.push(this.getIndexFromRange(rng(), combatants));
        }

        if(randomCombatants[0] === {}) {
            return [];
        }

        randomCombatants = randomCombatants.map((robot, index) => {robot.name = this.getName(rng()); return robot;})
        return randomCombatants;
    }

    getCaptain(seed) {
        let rng = SeedRandom(seed);
        let captain = this.getIndexFromRange(rng(), this.props.captains);
        captain.name = this.getName(rng());
        return captain;
    }

    getName(seed) {
        let rng = SeedRandom(seed);
        let name = [];
        for (let i = 0; i < 2; i++) {
            name.push(uniqueNamesGenerator({ style: "capital", length: 1, separator: " ", seed: rng() * 4900, dictionaries:[names, names] }));
        }
        return name.join(" ");
    }

    getIndexFromRange(rand, arr) {
        if (arr.length === 0) {
            return {}
        }
        return {...arr[this.getNumberFromRange(rand, arr.length)]};
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
        fetch('http://localhost:5000/victories', configObj)
        .then(res => res.json())
        .then(console.log)
    }
}