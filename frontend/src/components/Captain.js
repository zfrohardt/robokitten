import React from 'react';
import {Card, Icon, Image} from 'semantic-ui-react';

const Captain = props => {
    return (
        <Card className={props.type}>
            <Image src={props.cat ? `https://robohash.org/ModelNumber${props.modelNumber}.png?set=set4` : `https://robohash.org/ModelNumber${props.modelNumber}.png`} wrapped ui={false} className={props.type}/>
            <Card.Content>
                <Card.Header>
                    <Icon color='grey' name='flag' />
                    Captain {props.name}
                </Card.Header>
                <Card.Meta>Model Number {props.modelNumber}</Card.Meta>
                <Card.Description>{props.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Card.Header>Captain Bonus:</Card.Header>
                <Card.Description>{props.teamBonusDesc}</Card.Description>
            </Card.Content>
        </Card>
    )
}

export default Captain