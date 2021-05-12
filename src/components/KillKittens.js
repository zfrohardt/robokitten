import React from 'react';
import RobotBattleCard from './RobotBattleCard'
import Captain from './Captain'
import { Button, Grid } from 'semantic-ui-react';

class KillKittens extends React.Component {
    constructor() {
        super();
        this.state = {
            warriors: [],
        };
    }

    componentDidMount() {
        this.setState({
            warriors: this.props.warriors.map(warrior => {
                warrior._currentHealth = warrior.maxHealth;
                Object.defineProperty(warrior, "currentHealth", {
                    set: function (newHealth) {
                        this._currentHealth = (newHealth < this.maxHealth)? newHealth : this.maxHealth;
                        this._currentHealth = (newHealth > 0)? newHealth : 0;
                    },
                    get: function() {
                        return this._currentHealth;
                    },
                    configurable: true,
                });
                return warrior;
            })
        })
    }


    
    renderBattleRobots = () => {
        return this.state.warriors.map(warrior => <RobotBattleCard name={`Robot #${warrior.modelNumber}`} {...warrior} />)
    }

    render() {
        return (
            <div>
                <Grid container columns='equal' >
                    <Grid.Row>
                        <Grid.Column>
                            <Captain {...this.props.captain}/>
                        </Grid.Column>
                        <Grid.Column verticalAlign="middle" width={2}>
                            <Button 
                            size="large" 
                            color="olive" 
                            content="End Turn"
                            disabled={false}
                            onClick={() => console.log('end turn')} />
                        </Grid.Column>
                        <Grid.Column>
                            <Captain {...this.props.captain}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            {this.renderBattleRobots()}
                        </Grid.Column>
                        <Grid.Column>
                            <div className="gameLog">
                                <h3>Game Log</h3>
                                <ul>
                                    <li></li>
                                </ul>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            {this.renderBattleRobots()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default KillKittens;