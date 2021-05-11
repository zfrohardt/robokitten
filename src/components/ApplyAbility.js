

const applyAbility = (abilityId, state, self, target) => {
    return abilityLookup[abilityId](state, self, target);
}

const abilityLookup = {
    1 : (state, self, target) => true, // redirect
    2 : (state, self, target) => {state.team = state.team.map(warrior => warrior.defense = warrior.defense + 1)},
    3 : (state, self, target) => {state.team = state.team.map(warrior => warrior.defense = warrior.defense + 2)},
    4 : (state, self, target) => true, // redirect
    5 : (state, self, target) => {state.team = state.team.map(warrior => warrior.defense = warrior.defense * 2)},
    6 : (state, self, target) => false,
    7 : (state, self, target) => {state.team = state.team.map(warrior => warrior.health = cap(warrior.health + 4, warrior.maxHealth))},
    8 : (state, self, target) => {state.team = state.team.map(warrior => warrior.health = cap(warrior.health + 2, warrior.health))},
    9 : (state, self, target) => {state.team = state.team.map(warrior => warrior.damage = warrior.damage + 2)},
    10: (state, self, target) => true,
    11: (state, self, target) => false,
    12: (state, self, target) => false,
    13: (state, self, target) => {state.team = state.team.map(warrior => warrior.damage = warrior.damage + 3)},
    14: (state, self, target) => false,
    15: (state, self, target) => false,
    16: (state, self, target) => false,
    17: (state, self, target) => false,
    18: (state, self, target) => false,
    19: (state, self, target) => false,
    20: (state, self, target) => false,
    21: (state, self, target) => false,
    22: (state, self, target) => false,
    23: (state, self, target) => false,
    24: (state, self, target) => false,
    25: (state, self, target) => false,
    26: (state, self, target) => false,
    27: (state, self, target) => false,
    28: (state, self, target) => false,
    29: (state, self, target) => false,
    30: (state, self, target) => false,
}

const cap = (val, cap) => {
    return (val < cap)? val : cap;
}

export default applyAbility;