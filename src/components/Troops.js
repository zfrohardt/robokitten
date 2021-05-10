import React from 'react'
import {Card} from 'semantic-ui-react';
import Robot from './Robot';

const Troops = (props) => {
    return (
        <Card.Group>
            {props.robots.map(makeRobotCard)}
        </Card.Group>
    );
}

const makeRobotCard = robot => {
    return (
        <Robot {...robot} img={`https://robohash.org/ModelNumber${robot.modelNumber}.png`} name={`Robot Model ${robot.modelNumber}`} />
    );
}

export default Troops;