import React from 'react';
import RobotBattleCard from './RobotBattleCard'
import Captain from './Captain'
import { Button, Grid } from 'semantic-ui-react';

class KillKittens extends React.Component {
    state = {

    }

    getAbilities = (robot, abilities) => {
        return abilities.filter(ability => robot.abilityIds.includes(ability.id));
    }
    
    renderBattleRobots = () => {
        return this.props.warriors.map(warrior => <RobotBattleCard name={`Robot #${warrior.modelNumber}`} {...warrior} abilities={this.getAbilities(warrior, this.props.abilities)} />)
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