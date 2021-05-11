

const applyAbility = (abilityId, state, self, target) => {
    return abilityLookup[abilityId](state, self, target);
}

const abilityLookup = {
    1 : (state, self, target) => true,
    2 : (state, self, target) => true,
    3 : (state, self, target) => true,
    4 : (state, self, target) => true,
    5 : (state, self, target) => true,
    6 : (state, self, target) => false,
    7 : (state, self, target) => true,
    8 : (state, self, target) => true,
    9 : (state, self, target) => true,
    10: (state, self, target) => true,
    11: (state, self, target) => false,
    12: (state, self, target) => false,
    13: (state, self, target) => true,
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

export default applyAbility;