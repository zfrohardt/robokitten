import React from 'react';
import {Card, Dropdown, Grid, Icon, Image, Menu, Popup, Progress} from 'semantic-ui-react';
import iconMapper from './TypeIcons'
import { Component } from 'react';

class RobotBattleCard extends Component {
    state = {
        abilities: [],
        confirmed: true
    }

    chooseAbility = (ability, target) => {
        const passiveAbilities = this.props.abilities.filter(ability => ability.passive)
        const chosenAbility = {
            ability: ability,
            target: target
        }

        this.setState({
            abilities: [...passiveAbilities, chosenAbility]
        }, ()=>this.props.packageUpdate(this.state))
    }

    renderAbilities = () => {
        return this.props.abilities.map(ability => {
        if (ability.target === 'team' || ability.target === 'enemy team') {
            return <Popup content={ability.passive ? `Passive ability: ${ability.description}` : ability.description} trigger={<Menu.Item 
                name={ability.name} 
                disabled={ability.passive} 
                color={true ? 'grey' : null} 
                onClick={()=>this.chooseAbility(ability, {})} />} />
        } else if (ability.target === 'enemy') {
            return <Popup content={ability.description} trigger={<Dropdown item text={ability.name}>
            <Dropdown.Menu>
                <Dropdown.Header>Choose a target</Dropdown.Header>
                {this.props.enemies.map((enemy, index) => <Dropdown.Item onClick={()=>this.chooseAbility(ability, enemy)}>{`# ${enemy.modelNumber}`}</Dropdown.Item>)}
            </Dropdown.Menu>
            </Dropdown>} />
        } else if (ability.target === 'warrior') {
            return <Popup content={ability.description} trigger={<Dropdown item text={ability.name}>
            <Dropdown.Menu>
                <Dropdown.Header>Choose a target</Dropdown.Header>
                {this.props.team.map((teammate, index) => <Dropdown.Item onClick={()=>this.chooseAbility(ability, teammate)}>{`# ${teammate.modelNumber}`}</Dropdown.Item>)}
            </Dropdown.Menu>
            </Dropdown>} />
        }
        })
    }

    confirmedAttack = () => {
        return true;
    }

    render() {
        return(
            <Grid container className={this.props.cat ? 'cat' : null}>
                <Grid.Column width={8}>
                    <Card className={this.props.type}>
                        <Card.Content>
                            <div className={`image ${this.props.type}`} style={{
                                borderRadius: '50%',
                                width: '30%',
                                float: 'left'}}> 
                            <Image 
                            src={this.props.cat ? `https://robohash.org/ModelNumber${this.props.modelNumber}.png?set=set4` : `https://robohash.org/ModelNumber${this.props.modelNumber}.png`} 
                            className={this.props.type}
                            size="tiny"
                            circular 
                            style={{transform: 'scaleX(-1)'}} />
                            </div>
                            <Card.Header><Icon color='grey' name={iconMapper[this.props.type]} />{this.props.name}</Card.Header>
                        </Card.Content>
                        <Card.Content extra>
                            {/* Health: {props.currentHealth}<br/> */}
                            <Progress 
                                value={this.props.currentHealth} 
                                total={this.props.maxHealth} 
                                progress='ratio'
                                label={`Health: ${this.props.currentHealth}`} 
                                color={
                                    this.props.currentHealth/this.props.maxHealth > 0.75 ? 'green' 
                                    : this.props.currentHealth/this.props.maxHealth < 0.25 ? 'red' 
                                    : 'yellow'}
                                size="small" />
                                Damage: {this.props.currentDamage}<br/>
                                Defense: {this.props.currentDefense}
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Menu vertical >
                        {this.renderAbilities()}
                        
                    </Menu>
                
                </Grid.Column>
            </Grid>
        )
    }
    
}



export default RobotBattleCard