import React, { useEffect, useState } from 'react';
import { Divider, Header, Item, List } from 'semantic-ui-react';

const Stats = (props) => {
	const [victoryLog, setLog] = useState([]);

	useEffect(() => {
		fetch('http://localhost:5000/victories')
			.then((res) => res.json())
			.then((victories) => {
				setLog(victories);
			});
	}, []);

	const renderVictories = () => {
		return victoryLog.map((victory) => {
			return (
				<Item.Group>
					<Item>
						<Item.Content>
							<Item.Header>Captain {victory.captain.captainName}</Item.Header>
							<Item.Meta>Model Number: {victory.captain.captainInfo.modelNumber}</Item.Meta>
							{victory.troops.map(troop => {
                                return (
                                    <React.Fragment>
                                        <Item.Description>{troop.troopName}</Item.Description>
                                        <Item.Meta>Model Number: {troop.troopInfo.modelNumber}</Item.Meta>
                                    </React.Fragment>
                                )})}
							<Item.Extra>
								<List items={victory.eventLog} />
							</Item.Extra>
						</Item.Content>
					</Item>
					<Divider />
				</Item.Group>
			);
		});
	};

	return (
		<div>
			<Header size="huge" >Our Glorious Victories</Header>
            {renderVictories()}
		</div>
	);
};

export default Stats;
