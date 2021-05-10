import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Header} from 'semantic-ui-react';

const SplashScreen = props => (
    <Container text>
        <Header as='h1'>Welcome to our game!</Header>
        <Button.Group vertical labeled icon>
            <Button as={Link} to="/play" icon="play" content="Exterminate the Kittens!" color="green" /> {/* Start the game */}
            <Button as={Link} to='/troops' icon="factory" content="Examine the Troops!" color="yellow" /> {/* Look at the list of robots */}
            <Button as={Link} to='/statistics' icon="hand victory" content="Admire our Victories!" color="yellow" /> {/* Look at high scores */}
        </Button.Group>
    </Container>
)

export default SplashScreen;