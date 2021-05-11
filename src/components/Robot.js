// Display component for a Robot
import React, {useState} from 'react';
import {Accordion, Card, Icon, Image} from 'semantic-ui-react';

const iconMapper = {
    fire: 'fire',
    lightning: 'lightning',
    bullet: 'crosshairs',
    normal: 'cog',
    captain: 'flag',
    passive: 'globe'
}
const Robot = props => {


    const [activeIndex, setIndex] = useState(-1);
    return (
        <Card>
            <Image src={`https://robohash.org/ModelNumber${props.modelNumber}.png`} wrapped ui={false} className={props.type}/>
            <Card.Content>
                <Card.Header><Icon color='grey' name={iconMapper[props.type]} />{props.name}</Card.Header>
                <Card.Meta>Class: {props.class} | Type: {props.type}</Card.Meta>
                <Card.Meta>Model Number {props.modelNumber}</Card.Meta>
                <Card.Description>{props.description}</Card.Description>
            </Card.Content>
            
            { props.damage !== -1 && props.health !== -1 && props.defense !== -1 &&
                <Card.Content>
                    Damage: {props.damage} | Health: {props.health} | Defense: {props.defense}
                </Card.Content>
            }

            { props.abilities.length > 0 &&
                <Card.Content extra>
                    <Accordion fluid styled>
                        {props.abilities.map((ability, index) => getAccordianEntry(activeIndex, setIndex, index, ability))}
                    </Accordion>
                </Card.Content>
            }
        </Card>
    );
}

const getAccordianEntry = (activeIndex, setIndex, index, ability) => {
    const passive = (ability.passive ? 'passive' : null)
    return (
        <React.Fragment key={index}>
            <Accordion.Title active={activeIndex === index} index={index} className={passive} onClick={() => handleClick(setIndex, activeIndex, index)} >
                <Icon name="dropdown" />
                <Icon color='grey' name={iconMapper[ability.passive ? 'passive' : ability.type]} />
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
    name: "Default Robot",
    modelNumber: -1,
    class: "Default",
    description: "I am but a humble default description for a humble default robot",
    damage: -1,
    health: -1,
    defense: -1,
    abilities : [],
}

export default Robot;