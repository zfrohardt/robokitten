import React from 'react';
import RobotBattleCard from './RobotBattleCard'
import Captain from './Captain'
import { Button, Grid } from 'semantic-ui-react';
import applyAbility from './ApplyAbility';
import SeedRandom from 'seedrandom';

const defaultAbilityPackage = {confirmed: false, abilities:[]}
const defaultAbilityPackageGroup = [defaultAbilityPackage, defaultAbilityPackage, defaultAbilityPackage]

class KillKittens extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            warriors: [],
            kittens: [],
            events: [],
            turnNumber: 1,
            seed: props.seed,
            pendingAbilities: defaultAbilityPackageGroup,
        };
    }

    componentDidUpdate() {
        console.log(this.state.pendingAbilities)
    }

    componentDidMount() {
        let updateCallback = () => this.forceUpdate();
        this.setState({
            warriors: this.props.warriors.map(warrior => {
                warrior._currentHealth = warrior.maxHealth;
                Object.defineProperty(warrior, "currentHealth", {
                    set: function(newHealth) {
                        this._currentHealth = (newHealth < this.maxHealth)? newHealth : this.maxHealth;
                        this._currentHealth = (newHealth > 0)? newHealth : 0;
                        updateCallback();
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
                        updateCallback();
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
                        updateCallback();
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

    renderBattleRobots = (combatants, enemies, turn) => {
        return combatants.map((warrior, index) => <RobotBattleCard packageUpdate={(abilityPackage) => this.packageUpdate(index, abilityPackage)} name={`Robot #${warrior.modelNumber}`} {...warrior} enemies={enemies} team={combatants} turn={turn}/>)
    }

    postEvents(events) {
        this.setState({
            events: this.state.events.concat(events),
        });
    }

    endOfTurnHandler = (robots, kittens) => {
        let rng = SeedRandom(this.state.seed);
        let state = (this.state.turnNumber % 2 === 1)? {team: robots, enemies: kittens} : {team: kittens, enemies: robots};
        let event = applyAbility(rng(), 25, state, robots[0], robots[1]);
        let event2 = applyAbility(rng(), 13, state, robots[0], robots[1]);
        this.setState({
            seed: rng(),
            turnNumber: this.state.turnNumber + 1,
        })
        this.postEvents([event, event2])
    }

    packageUpdate(index, abilityPackage) {
        let packages = this.state.pendingAbilities.slice(0);
        packages[index] = abilityPackage;
        this.setState({
            pendingAbilities: packages,
        })
    }

    resetPendingUpdates() {
        this.setState({
            pendingAbilities: defaultAbilityPackageGroup,
        })
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
                            content={`End ${(this.state.turnNumber % 2 === 1)? "Robot" : "Kitten"} Turn`}
                            disabled={this.state.pendingAbilities.reduce((acc, val) => acc && val, true)}
                            onClick={event => this.endOfTurnHandler(this.state.warriors, this.state.robots)}/>
                        </Grid.Column>
                        <Grid.Column>
                            <Captain {...this.props.captain}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            {this.renderBattleRobots(this.state.warriors, this.props.kittens, this.state.turnNumber % 2 === 0)}
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <div className="gameLog">
                                <h3>Game Log</h3>
                                <ul>
                                    {this.state.events.reverse().map(event => <li>{event}</li>)}
                                </ul>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            {this.renderBattleRobots(this.props.kittens, this.state.warriors, this.state.turnNumber % 2 === 1)}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default KillKittens;