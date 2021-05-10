import React, {useState} from 'react'
import {Dropdown, Container, Card, Menu} from 'semantic-ui-react';
import Robot from './Robot';

const Troops = (props) => {

    const [sort, setSort] = useState("modelNumber");
    const [classFilter, setClassFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");

    console.log(sort);
    console.log(classFilter);
    console.log(typeFilter);

    return (
        <React.Fragment>
            <Container textAlign='center' >
                <Menu secondary compact>
                <Menu.Item>
                        <span>
                            Sort by:&emsp;
                            <Dropdown inline options={sortOptions} defaultValue="modelNumber" onChange={(event, {value}) => setSort(value)} />
                        </span>
                    </Menu.Item>
                    <Menu.Item>
                        <span>
                            Filter by Class:&emsp;
                            <Dropdown inline options={classOptions} defaultValue="All" onChange={(event, {value}) => setClassFilter(value)} />
                        </span>
                    </Menu.Item>
                    <Menu.Item>
                        <span>
                            Filter by Type:&emsp;
                            <Dropdown inline options={typeOptions} defaultValue="All" onChange={(event, {value}) => setTypeFilter(value)} />
                        </span>
                    </Menu.Item>
                </Menu>
            </Container>
            <Card.Group>
                {applyFiltersAndSort(props.robots, classFilter, typeFilter, sort).map((robot, index) => makeRobotCard(index, robot, props.abilities))}
            </Card.Group>
        </React.Fragment>
    );
}

const applyFiltersAndSort = (robots, classFilter, typeFilter, sort) => {
    return robots.filter(robot => filterClass(robot, classFilter))
                 .filter(robot => filterType(robot, typeFilter))
                 .sort(sortFunctions[sort]);
}

const sortOptions = [
    {
        key: 0,
        text: "Model Number",
        value: "modelNumber",
    },
    {
        key: 1,
        text: "Damage",
        value: "damage"
    },
    {
        key: 2,
        text: "Health",
        value: "health"
    },
    {
        key: 3,
        text: "Defense",
        value: "defense",
    }
]

const sortFunctions = {
    "modelNumber": (x, y) => x.modelNumber - y.modelNumber,
    "damage": (x, y) => y.damage - x.damage,
    "health": (x, y) => y.health - x.health,
    "defense": (x, y) => y.defense - x.defense,
}

const classOptions = [
    {
        key: 0,
        text: "All",
        value: "All",
    },
    {
        key: 1,
        text: "Attacker",
        value: "Attacker"
    },
    {
        key: 2,
        text: "Defender",
        value: "Defender"
    },
    {
        key: 3,
        text: "Healer",
        value: "Healer",
    }
]

const filterClass = (robot, filter) => {
    if(filter === "All") {
        return true;
    }
    return robot.class === filter;
}

const typeOptions = [
    {
        key: 0,
        text: "All",
        value: "All",
    },
    {
        key: 1,
        text: "Normal",
        value: "normal",
    },
    {
        key: 2,
        text: "Fire",
        value: "fire",
    },
    {
        key: 3,
        text: "Lightning",
        value: "lightning",
    },
    {
        key: 4,
        text: "Bullet",
        value: "bullet",
    }
]

const filterType = (robot, filter) => {
    if(filter === "All") {
        return true;
    }
    return robot.type === filter;
}

const makeRobotCard = (key, robot, abilities) => {
    // TODO: Sort by the order of ids in the db? maybe this is a non issue
    let specificAbilities = abilities.filter(ability => robot.abilityIds.includes(ability.id));
    return (
        <Robot key={key} {...robot} img={`https://robohash.org/ModelNumber${robot.modelNumber}.png`} name={`Robot Model ${robot.modelNumber}`} abilities={specificAbilities} />
    );
}

export default Troops;