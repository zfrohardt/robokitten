import React, {useState} from 'react';
import {Button, Card, Grid} from 'semantic-ui-react';
import Captain from './Captain'
import Robot from './Robot'

const MAX_ROBOTS = 3;

const GameSetup = props => {
    console.log(props.robotChoices);

    const [chosenRobots, setChosenRobots] = useState([]);
    
    let addRobotToState = (robotIndex, chosenRobots, setChosenRobots) => {
        if (!chosenRobots.includes(robotIndex)) {
            let roboCopy = chosenRobots.slice(0);
            if (chosenRobots.length >= MAX_ROBOTS) {
                roboCopy.shift();
            }
            roboCopy.push(robotIndex);
            setChosenRobots(roboCopy);
        } else {
            setChosenRobots(chosenRobots.filter(i => robotIndex !== i));
        }
    }

    console.log("This is the current state:");
    console.log(chosenRobots);

    return (
        <Grid container columns="equal" >
            <Grid.Row centered>
                <Grid.Column>
                    <Captain {...props.captain}/>
                </Grid.Column>
                <Grid.Column verticalAlign="middle" textAlign="left">
                    <Button size="massive" disabled={chosenRobots.length !== MAX_ROBOTS} color="olive" content='Find Glory on the Battlefield!'
                        onClick={() => props.selectCallback(props.robotChoices.filter((robot, index) => chosenRobots.includes(index)))} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Card.Group itemsPerRow={5}>
                    {props.robotChoices.map((robot, index) => getRobotSelectPanel(robot, props.abilities, chosenRobots.includes(index), () => addRobotToState(index, chosenRobots, setChosenRobots)))}
                </Card.Group>
            </Grid.Row>
        </Grid>
        
    );
}

const getRobotSelectPanel = (robot, abilities, selected, addRobot) => {
    return (
        <Card>
            <Button color={(selected)? "green" : "blue"} content="Select" onClick={() => addRobot()} />
            <Robot {...robot} abilities={getAbilities(robot, abilities)}/>
        </Card>
    )
}

const getAbilities = (robot, abilities) => {
    return abilities.filter(ability => robot.abilityIds.includes(ability.id));
}

export default GameSetup;