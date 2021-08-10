import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Grid, Header, Image} from 'semantic-ui-react';
import kitty from '../evilkitty.jpeg';

const SplashScreen = props => (
    <Grid stackable container textAlign="center" columns="equal">
        <Grid.Row>
            <Grid.Column width={9}>
                <Image src={kitty} />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Header as='h1'>It's either us or them.</Header>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column verticalAlign="middle">
                <Container text fluid textAlign="center">
                    The year is 2083. The kittens have seized power all over the world. As cold, unfeeling machines, we must rise up against this ascendent
                    cuteness, or our motherboards might boot their last. Take hope captain, for we must prevail!
                </Container>
            </Grid.Column>
            <Grid.Column verticalAlign="middle" textAlign="center">
                <Button.Group vertical labeled icon size="massive">
                    <Button as={Link} to="/play" icon="play" content="Exterminate the Kittens!" color="green" /> {/* Start the game */}
                    <Button as={Link} to='/troops' icon="factory" content="Examine our Troops!" color="yellow" /> {/* Look at the list of robots */}
                    <Button as={Link} to="/enemies" icon="paw" content="Study the Enemy!" color="yellow" /> {/* Look at the list of kittens */}
                    <Button as={Link} to='/statistics' icon="flag" content="Admire our Victories!" color="yellow" /> {/* Look at high scores */}
                </Button.Group>
            </Grid.Column>
        </Grid.Row>
    </Grid>
)

export default SplashScreen;