import React, {useState} from 'react'
import {Dropdown, Container, Card, Menu} from 'semantic-ui-react';
import RobotDisplayCard from './RobotDisplayCard';
import KittenDisplayCard from './KittenDisplayCard';

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
                {(props.kittens)? 
                    applyFiltersAndSort(props.troops, classFilter, typeFilter, sort).map((robot, index) => makeKittenCard(index, robot)) :
                    applyFiltersAndSort(props.troops, classFilter, typeFilter, sort).map((kitten, index) => makeRobotCard(index, kitten))
                }
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
    "damage": (x, y) => y.baseDamage - x.baseDamage,
    "health": (x, y) => y.maxHealth - x.maxHealth,
    "defense": (x, y) => y.baseDefense - x.baseDefense,
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

const filterClass = (troop, filter) => {
    if(filter === "All") {
        return true;
    }
    return troop.class === filter;
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

const filterType = (troop, filter) => {
    if(filter === "All") {
        return true;
    }
    return troop.type === filter;
}

const makeRobotCard = (key, robot) => {
    // console.log(robot.maxHealth);
    return (
        <RobotDisplayCard key={key} {...robot} name={`Robot Model ${robot.modelNumber}`} />
    );
}

const makeKittenCard = (key, kitten) => {
    // console.log(kitten);
    return (
        <KittenDisplayCard key={key} {...kitten} name={`Kitten Breed ${kitten.modelNumber}`} />
    );
}

export default Troops;