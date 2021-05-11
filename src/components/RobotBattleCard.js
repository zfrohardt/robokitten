import React from 'react';
import {Button, Card, Grid, Icon, Image} from 'semantic-ui-react';
import iconMapper from './TypeIcons'

const RobotBattleCard = props => {
    console.log(props)
    const renderAbilities = () => {
        return props.abilities.map(ability => <Button>{ability.name}</Button>)
    }

    return(
        <Grid container >
            <Grid.Column width={12}>
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
                        Damage: {props.baseDamage}<br/>
                        Health: {props.maxHealth}<br/>
                        Defense: {props.baseDefense}
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column>
                <Button.Group vertical>
                    {renderAbilities()}
                </Button.Group>
            </Grid.Column>
            <Grid.Column>

            </Grid.Column>
        </Grid>
    )
}

export default RobotBattleCard