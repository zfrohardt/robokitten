import {React, Component} from 'react';
import SeedRandom from 'seedrandom';

export default class Game extends Component {
    constructor(props) {
        super(props);

        let seedrandom = require('seedrandom');
        let rng = seedrandom(props.seed);

        this.state = {
            rng: rng,
        }
    }

    render() {
        return (
            <div>
                This is where we build all of our game logic: {this.props.seed} <br />
                This is a list of 10 random numbers. They should be the same if you provide the same URL. They should be different with a different URL. You get the idea.<br/>
                {this.test()}
            </div>
        );
    }

    test() {
        let randomSet = [];
        for (let i = 0; i < 10; i++) {
            randomSet.push(<p>{this.state.rng()}</p>);
        }

        return randomSet
    }
}