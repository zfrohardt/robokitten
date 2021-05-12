import React from 'react';
import {Card, Dropdown, Grid, Icon, Image, Menu, Popup, Progress} from 'semantic-ui-react';
import iconMapper from './TypeIcons'

const RobotBattleCard = props => {
    //console.log(props)
    const renderAbilities = () => {
        return props.abilities.map(ability => {
        if (ability.target === 'team' || ability.taget === 'enemy team') {
            return <Popup content={ability.passive ? `Passive ability: ${ability.description}` : ability.description} trigger={<Menu.Item 
                name={ability.name} 
                disabled={ability.passive} 
                color={true ? 'grey' : null} 
                onClick={()=>console.log(ability.name)} />} />
        } else {
            return <Popup content={ability.description} trigger={<Dropdown item text={ability.name}>
            <Dropdown.Menu>
                <Dropdown.Header>Choose a target</Dropdown.Header>
                <Dropdown.Item>Kittie 1</Dropdown.Item>
                <Dropdown.Item>Kittie 2</Dropdown.Item>
                <Dropdown.Item>Kittie 3</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>} />
        }
        })
    }

    return(
        <Grid container className={props.cat ? 'cat' : null}>
            <Grid.Column width={8}>
                <Card className={props.type}>
                    <Card.Content>
                        <div className={`image ${props.type}`} style={{
                            borderRadius: '50%',
                            width: '30%',
                            float: 'left'}}> 
                        <Image 
                        src={props.cat ? `https://robohash.org/ModelNumber${props.modelNumber}.png?set=set4` : `https://robohash.org/ModelNumber${props.modelNumber}.png`} 
                        className={props.type}
                        size="tiny"
                        circular 
                        style={{transform: 'scaleX(-1)'}} />
                        </div>
                        <Card.Header><Icon color='grey' name={iconMapper[props.type]} />{props.name}</Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                        {/* Health: {props.currentHealth}<br/> */}
                        <Progress 
                            value={props.currentHealth} 
                            total={props.maxHealth} 
                            progress='ratio'
                            label={`Health: ${props.currentHealth}`} 
                            color={
                                props.currentHealth/props.maxHealth > 0.75 ? 'green' 
                                : props.currentHealth/props.maxHealth < 0.25 ? 'red' 
                                : 'yellow'}
                            size="small" />
                            Damage: {props.currentDamage}<br/>
                            Defense: {props.currentDefense}
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column width={8}>
                <Menu vertical >
                    {renderAbilities()}
                    
                </Menu>
            
            </Grid.Column>
        </Grid>
    )
}

const confirmedAttack = () => {
    return true;
}

const getAbilityPackage = () => {
    // {
    //     abilities: [
    //         {},
    //         {},
    //         {}
    //     ]
    // }
}

export default RobotBattleCard