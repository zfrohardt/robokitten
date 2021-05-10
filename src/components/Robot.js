// Display component for a Robot
import React, {useState} from 'react';
import {Accordion, Card, Icon, Image} from 'semantic-ui-react';

const Robot = props => {
    const [activeIndex, setIndex] = useState(-1);
    return (
        <Card>
            <Image src={props.img} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{props.name}</Card.Header>
                <Card.Meta>Class: {props.class} | Model Number {props.modelNumber}</Card.Meta>
                <Card.Description>{props.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                Damage: {props.damage} | Health: {props.health} | Defense: {props.defense}
            </Card.Content>
            <Card.Content extra>
                <Accordion fluid styled>
                    {props.attributes.map((attribute, index) => getAccordianEntry(activeIndex, setIndex, index, attribute.name, attribute.description))}
                </Accordion>
            </Card.Content>
        </Card>
    );
}

const getAccordianEntry = (activeIndex, setIndex, index, title, description) => {
    return (
        <React.Fragment>
            <Accordion.Title active={activeIndex === index} index={index} onClick={() => handleClick(setIndex, activeIndex, index)} >
                <Icon name="dropdown" />
                {title}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === index} >
                {description}
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