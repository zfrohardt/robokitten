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
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={() => handleClick(setIndex, activeIndex, 0)} >
                        <Icon name="dropdown" />
                        Attribute 1
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0} >
                        Details for Attribute 1
                    </Accordion.Content>
                    <Accordion.Title active={activeIndex === 1} index={1} onClick={() => handleClick(setIndex, activeIndex, 1)} >
                        <Icon name="dropdown" />
                        Attribute 2
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1} >
                        Details for Attribute 2
                    </Accordion.Content>
                    <Accordion.Title active={activeIndex === 2} index={2} onClick={() => handleClick(setIndex, activeIndex, 2)} >
                        <Icon name="dropdown" />
                        Attribute 3
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2} >
                        Details for Attribute 3
                    </Accordion.Content>
                </Accordion>
            </Card.Content>
        </Card>
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
}

export default Robot;