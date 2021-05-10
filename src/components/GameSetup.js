import React from 'react';
import {Button, Card, Grid} from 'semantic-ui-react';
import Robot from './Robot'

const GameSetup = props => {
    console.log(props.robotChoices)
    return (
        <Grid>
            <Grid.Row>
                <Robot {...props.captain}/>
            </Grid.Row>
            <Grid.Row>
                <Card.Group itemsPerRow={5}>
                    {props.robotChoices.map(robot => getRobotSelectPanel(robot, props.abilities, ()=>true))}
                </Card.Group>
            </Grid.Row>
            <Button onClick={() => props.selectCallback('dummy string')} disabled={false} color="olive" content='Find Glory on the Battlefield!'/>
        </Grid>
        
    );
}

const getRobotSelectPanel = (robot, abilities, select) => {
    return (
        <Card>
            <Button content="Select"/>
            <Robot {...robot} abilities={getAbilities(robot, abilities)}/>
        </Card>
    )
}

const getAbilities = (robot, abilities) => {
    return abilities.filter(ability => robot.abilityIds.includes(ability.id));
}

export default GameSetup;