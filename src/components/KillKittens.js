import React from 'react';
import RobotBattleCard from './RobotBattleCard'
import Captain from './Captain'
import { Button, Grid } from 'semantic-ui-react';

class KillKittens extends React.Component {
    constructor() {
        super();
        this.state = {
            warriors: [],
            events: []
        };
    }

    componentDidMount() {
        this.setState({
            warriors: this.props.warriors.map(warrior => {
                warrior._currentHealth = warrior.maxHealth;
                Object.defineProperty(warrior, "currentHealth", {
                    set: function(newHealth) {
                        this._currentHealth = (newHealth < this.maxHealth)? newHealth : this.maxHealth;
                        this._currentHealth = (newHealth > 0)? newHealth : 0;
                    },
                    get: function() {
                        return this._currentHealth;
                    },
                    configurable: true,
                    enumerable: true,
                });

                warrior._currentDamage = warrior.baseDamage;
                Object.defineProperty(warrior, "currentDamage", {
                    set: function(newDamage) {
                        this._currentDamage = (newDamage > 0)? newDamage : 0;
                    },
                    get: function() {
                        return this._currentDamage;
                    },
                    configurable: true,
                    enumerable: true,
                });

                warrior._currentDefense = warrior.baseDefense;
                Object.defineProperty(warrior, "currentDefense", {
                    set: function(newDefense) {
                        this._currentDefense = (newDefense > 0)? newDefense : 0;
                    },
                    get: function() {
                        return this._currentDefense;
                    },
                    configurable: true,
                    enumerable: true,
                });

                return warrior;
            })
        })
    }

    renderBattleRobots = (combatants) => {
        return combatants.map(warrior => <RobotBattleCard name={`Robot #${warrior.modelNumber}`} {...warrior} />)
    }

    render() {
        return (
            <div>
                <Grid columns='equal' >
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
                            {this.renderBattleRobots(this.state.warriors)}
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <div className="gameLog">
                                <h3>Game Log</h3>
                                <ul>
                                    {this.state.events.map(event => <li></li>)}
                                </ul>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            {this.renderBattleRobots(this.props.kittens)}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default KillKittens;