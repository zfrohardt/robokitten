import React from 'react';
import RobotBattleCard from './RobotBattleCard'
import Captain from './Captain'
import { Button, Grid } from 'semantic-ui-react';
import applyAbility from './ApplyAbility';
import Victory from './Victory';
import Defeat from './Defeat';
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

    componentDidMount() {
        let updateCallback = () => this.forceUpdate();
        this.setState({
            warriors: this.addStatefulStats(this.props.warriors, updateCallback),
            kittens: this.addStatefulStats(this.props.kittens, updateCallback)
        })
    }

    addStatefulStats = (combatants, updateCallback) => {
        return combatants.map(combatant => {
            combatant._currentHealth = combatant.maxHealth;
            Object.defineProperty(combatant, "currentHealth", {
                set: function(newHealth) {
                    this._currentHealth = (newHealth > this.maxHealth)? this.maxHealth : (newHealth < 0)? 0 : newHealth;
                    updateCallback();
                },
                get: function() {
                    return this._currentHealth;
                },
                configurable: true,
                enumerable: true,
            });

            combatant._currentDamage = combatant.baseDamage;
            Object.defineProperty(combatant, "currentDamage", {
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

            combatant._currentDefense = combatant.baseDefense;
            Object.defineProperty(combatant, "currentDefense", {
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

            return combatant;
        })
    }

    componentDidUpdate() {
        console.log(this.state.pendingAbilities);
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
        
        let events = this.state.pendingAbilities.map((pending, index) => {
            let returnArray = pending.abilities.map(ability => {ability.self = state.team[index]; return ability;})
            return returnArray;
        })
        events = events.reduce((acc, arr) => acc.concat(arr), [])
        events.sort((x, y) => (x.ability.passive === y.ability.passive)? 0 : (x.ability.passive)? 0 : 1);

        events = events.map(event => applyAbility(rng(), event.ability.id, state, event.self, event.target));
        this.postEvents(events);
        console.log(robots.filter(robot => robot.currentHealth > 0))
        console.log(kittens.filter(kitten => kitten.currentHealth > 0))
        this.setState({
            seed: rng(),
            turnNumber: this.state.turnNumber + 1,
            warriors: robots.filter(robot => robot.currentHealth > 0),
            kittens: kittens.filter(kitten => kitten.currentHealth > 0),
        })
        this.resetPendingUpdates();
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

    numberAlive = () => {
        return (this.state.turnNumber % 2 === 1)? this.state.warriors.reduce((acc, warrior) => (warrior.currentHealth > 0)? acc + 1 : acc, 0) : this.state.kittens.reduce((acc, kitten) => (kitten.currentHealth > 0)? acc + 1 : acc, 0);
    }

    render() {
        return (
            (this.state.kittens.length === 0)? <Victory postVictory={() => 
                this.props.postVictories({
                    captainName: this.props.captain.name, 
                    captainId: this.props.captain.id, 
                    troops:this.props.warriors.map(troop => {return {name: troop.name, id: troop.id}}), eventLog: this.state.events})} 
                    name={this.props.captain.name}
                /> : 
            (this.state.warriors.length === 0)? <Defeat /> :
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
                            disabled={this.numberAlive() !== this.state.pendingAbilities.reduce((acc, val) => (val.confirmed)? acc + 1 : acc, 0)}
                            onClick={event => this.endOfTurnHandler(this.state.warriors, this.state.kittens)}/>
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