// Display component for a Robot
import React, {useState} from 'react';
import {Accordion, Card, Icon, Image} from 'semantic-ui-react';

const Robot = props => {

    const iconMapper = {
        fire: 'fire',
        lightning: 'lightning',
        bullet: 'crosshairs',
        normal: 'power off'
    }

    const [activeIndex, setIndex] = useState(-1);
    return (
        <Card>
            <Image src={props.img} wrapped ui={false} className={props.type}/>
            <Card.Content>
                <Card.Header><Icon color='grey' name={iconMapper[props.type]} />{props.name}</Card.Header>
                <Card.Meta>Class: {props.class} | Type: {props.type}</Card.Meta>
                <Card.Meta>Model Number {props.modelNumber}</Card.Meta>
                <Card.Description>{props.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                Damage: {props.damage} | Health: {props.health} | Defense: {props.defense}
            </Card.Content>
            <Card.Content extra>
                <Accordion fluid styled>
                    {props.abilities.map((ability, index) => getAccordianEntry(activeIndex, setIndex, index, ability))}
                </Accordion>
            </Card.Content>
        </Card>
    );
}

const getAccordianEntry = (activeIndex, setIndex, index, ability) => {
    const passive = (ability.passive ? 'passive' : null)
    return (
        <React.Fragment key={index}>
            <Accordion.Title active={activeIndex === index} index={index} className={passive} onClick={() => handleClick(setIndex, activeIndex, index)} >
                <Icon name="dropdown" />
                {ability.name}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === index} >
                {ability.description}
            </Accordion.Content>
        </React.Fragment>
    );
}

const handleClick = (setIndex, activeIndex, index) => {
    setIndex((activeIndex === index)? -1 : index);
}

Robot.defaultProps = {
    img: "https://robohash.org/default",
    name: "Default Robot",
    modelNumber: -1,
    class: "Default",
    description: "I am but a humble default description for a humble default robot",
    damage: -1,
    health: -1,
    defense: -1,
    attributes : [
        {
          name: "First",
          description: "I am first",
        },
        {
          name: "Second",
          description: "I am second",
        },
        {
          name: "Third",
          description: "I am third",
        }
    ],
}

export default Robot;