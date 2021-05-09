import React, {Link} from 'react';
import {Button, Container, Header} from 'semantic-ui-react';

const SplashScreen = props => (
    <Container text>
        <Header as='h1'>Welcome to our game!</Header>
        <Button.Group vertical labeled icon>
            <Button icon="play" content="Exterminate the Kittens!" color="green" /> {/* Start the game */}
            <Button icon="factory" content="Examine the Troops!" color="yellow" /> {/* Look at the list of robots */}
            <Button icon="hand victory" content="Admire our Victories!" color="yellow" /> {/* Look at high scores */}
        </Button.Group>
        <Link href="/test" />
    </Container>
)

export default SplashScreen;