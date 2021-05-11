import React, {useState} from 'react';
import {Button, Card, Grid} from 'semantic-ui-react';
import Captain from './Captain'
import RobotDisplayCard from './RobotDisplayCard'

const MAX_ROBOTS = 3;

const GameSetup = props => {
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
                    {props.robotChoices.map((robot, index) => getRobotSelectPanel(robot, chosenRobots.includes(index), () => addRobotToState(index, chosenRobots, setChosenRobots)))}
                </Card.Group>
            </Grid.Row>
        </Grid>
        
    );
}

const getRobotSelectPanel = (robot, selected, addRobot) => {
    return (
        <Card>
            <Button color={(selected)? "green" : "blue"} content="Select" onClick={() => addRobot()} />
            <RobotDisplayCard {...robot} />
        </Card>
    )
}

export default GameSetup;