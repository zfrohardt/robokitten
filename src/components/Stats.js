import { useEffect, useState } from 'react';

const Stats = (props) => {
	const [victoryLog, setLog] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/victories')
			.then((res) => res.json())
			.then((victories) => {
				setLog(victories);
			});
	}, []);

	return <div>This is where we can record our stats</div>;
};

export default Stats;
