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
                <Card.Meta>Model Number {props.modelNumber}</Card.Meta>
                <Card.Description>{props.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                We would put all of the bots attributes here
                <Accordion fluid styled>
                    {props.attributes.map((attribute, index) => getAccordianEntry(activeIndex, setIndex, index, attribute.name, attribute.details))}
                </Accordion>
            </Card.Content>
        </Card>
    );
}

const getAccordianEntry = (activeIndex, setIndex, index, title, details) => {
    return (
        <React.Fragment>
            <Accordion.Title active={activeIndex === index} index={index} onClick={() => handleClick(setIndex, activeIndex, index)} >
                <Icon name="dropdown" />
                {title}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === index} >
                {details}
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
    description: "I am but a humble default description for a humble default robot",
    attributes : [
        {
          name: "First",
          details: "I am first",
        },
        {
          name: "Second",
          details: "I am second",
        },
        {
          name: "Third",
          details: "I am third",
        }
    ],
}

export default Robot;