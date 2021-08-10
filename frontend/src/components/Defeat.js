import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Grid, Image} from 'semantic-ui-react';

const Defeat = props => {
    return (
        <Grid centered>
            <Grid.Row>
                <Image fluid src="https://tailandfur.com/wp-content/uploads/2016/01/30-Cute-Smiling-Cat-Pictures-6.jpg"/>
            </Grid.Row>
            <Grid.Row>
                <Container text>
                    <p>
                        Captain {props.name}, you have lost many good robots today. Your defeat will be wiped from our hard drives to make
                        room for more successful robots. Perhaps you should study better, or next time you will be deactivated and used for spare parts.
                    </p>
                </Container>
            </Grid.Row>
            <Grid.Row>
                <Button.Group >
                    <Button as={Link} to="/statistics" icon="flag" content="Admire Better Robots" color="red" />
                    <Button.Or />
                    <Button as={Link} to="/" icon="cog" labelPosition="right" content="Return Home in Shame" color="red" />
                </Button.Group>
            </Grid.Row>
        </Grid>
    );
}

export default Defeat;