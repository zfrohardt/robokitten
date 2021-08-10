import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Grid, Image} from 'semantic-ui-react';

const Victory = props => {

    useEffect(() => {
		props.postVictory();
	}, []);

    return (
        <Grid centered>
            <Grid.Row>
                <Image fluid src="https://i.ytimg.com/vi/zPCZWn_iWb0/maxresdefault.jpg"/>
            </Grid.Row>
            <Grid.Row>
                <Container text>
                    <p>
                        Congratulations Captain {props.name}! You have successfully defeated the kitty scum. Your victory will be praised in the warrior halls of Bithalla forever! <br />
                        May hard drives record your exploits forever!
                    </p>
                </Container>
            </Grid.Row>
            <Grid.Row>
                <Button.Group >
                    <Button as={Link} to="/statistics" icon="flag" content="Admire our Victories!" color="green" />
                    <Button.Or />
                    <Button as={Link} to="/" icon="cog" labelPosition="right" content="Return Home as a Champion!" color="green" />
                </Button.Group>
            </Grid.Row>
        </Grid>
    );
}

export default Victory;