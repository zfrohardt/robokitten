import React from 'react';
import {Button, Card, Dropdown, Grid, Icon, Image, Menu} from 'semantic-ui-react';
import iconMapper from './TypeIcons'

const RobotBattleCard = props => {
    //console.log(props)
    const renderAbilities = () => {
        return props.abilities.map(ability => {
        if (ability.target === 'team' || ability.taget === 'enemy team') {
            return <Menu.Item 
                    name={ability.name} 
                    disabled={ability.passive} 
                    color={true ? 'grey' : null} 
                    onClick={()=>console.log(ability.name)} />
        } else {
            return <Dropdown item text={ability.name}>
            <Dropdown.Menu>
                <Dropdown.Header>Choose a target</Dropdown.Header>
                <Dropdown.Item>Kittie 1</Dropdown.Item>
                <Dropdown.Item>Kittie 2</Dropdown.Item>
                <Dropdown.Item>Kittie 3</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        }
        })
    }

    return(
        <Grid container >
            <Grid.Column width={8}>
                <Card className={props.type}>
                    <Card.Content>
                        <div className={`image ${props.type}`} style={{
                            borderRadius: '50%',
                            width: '30%',
                            float: 'left'}}> 
                        <Image 
                        src={`https://robohash.org/ModelNumber${props.modelNumber}.png`} 
                        className={props.type}
                        size="tiny"
                        circular />
                        </div>
                        <Card.Header><Icon color='grey' name={iconMapper[props.type]} />{props.name}</Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                        Damage: {props.currentDamage}<br/>
                        Health: {props.currentHealth}<br/>
                        Defense: {props.currentDefense}
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column width={5}>
                <Menu vertical >
                    {renderAbilities()}
                    
                </Menu>
            
            </Grid.Column>
        </Grid>
    )
}

export default RobotBattleCard