import React from 'react'
import {Dropdown, Container, Card, Menu} from 'semantic-ui-react';
import Robot from './Robot';

const Troops = (props) => {
    return (
        <React.Fragment>
            <Container textAlign='center' >
                <Menu secondary compact>
                    <Menu.Item>
                        <Dropdown multiple selection options={classOptions} placeholder="All" onChange={handleChange} />
                    </Menu.Item>
                </Menu>
            </Container>
            <Card.Group>
                {props.robots.map((robot, index) => makeRobotCard(index, robot, props.abilities))}
            </Card.Group>
        </React.Fragment>
    );
}

const handleChange = (event, { value }) => {
    console.log("This is firing!");
    console.log(event);
    console.log(value);
}

const sortOptions = [
    {
        key: 1,
        text: "Damage",
        value: "damage"
    },
    {
        key: 2,
        text: "Health",
        value: "health"
    },
    {
        key: 3,
        text: "Defense",
        value: "defense",
    }
]

const classOptions = [
    {
        key: 1,
        text: "Attacker",
        value: "Attacker"
    },
    {
        key: 2,
        text: "Defender",
        value: "Defender"
    },
    {
        key: 3,
        text: "Healer",
        value: "Healer",
    }
]

const typeOptions = [
    {
        key: 1,
        text: "Fire",
        value: "Fire",
    },
    {
        key: 2,
        text: "Lightning",
        value: "Lightning",
    },
    {
        key: 3,
        text: "Bullet",
        value: "Bullet",
    }
]

const makeRobotCard = (key, robot, abilities) => {
    // TODO: Sort by the order of ids in the db? maybe this is a non issue
    let specificAbilities = abilities.filter(ability => robot.abilities.includes(ability.id));
    return (
        <Robot key={key} {...robot} img={`https://robohash.org/ModelNumber${robot.modelNumber}.png`} name={`Robot Model ${robot.modelNumber}`} attributes={specificAbilities} />
    );
}

export default Troops;