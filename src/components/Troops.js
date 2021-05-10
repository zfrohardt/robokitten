import React from 'react'
import {Card} from 'semantic-ui-react';
import Robot from './Robot';

const Troops = (props) => {
    return (
        <Card.Group>
            {props.robots.map(robot => makeRobotCard(robot, props.abilities))}
        </Card.Group>
    );
}

const makeRobotCard = (robot, abilities) => {
    // TODO: Sort by the order of ids in the db? maybe this is a non issue
    let specificAbilities = abilities.filter(ability => robot.abilityIds.includes(ability.id));
    return (
        <Robot {...robot} img={`https://robohash.org/ModelNumber${robot.modelNumber}.png`} name={`Robot Model ${robot.modelNumber}`} abilities={specificAbilities} />
    );
}

export default Troops;