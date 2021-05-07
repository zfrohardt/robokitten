// Display component for a Robot
import React from 'react';
import {Card, Image} from 'semantic-ui-react';

const Robot = props => {
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
            </Card.Content>
        </Card>
    );
}

Robot.defaultProps = {
    img: "https://robohash.org/default",
    name: "Default Robot",
    modelNumber: -1,
    description: "I am but a humble default description for a humble default robot",
}

export default Robot;