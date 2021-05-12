import SeedRandom from 'seedrandom';

const applyAbility = (seed, abilityId, state, self, target={}) => {
    return abilityLookup[abilityId](state, self, target, seed);
}

const abilityLookup = {
    1 : (state, self, target, seed) => true, // redirect
    2 : (state, self, target, seed) => {state.team = state.team.map(warrior => warrior.currentDefense += 1)},
    3 : (state, self, target, seed) => {state.team = state.team.map(warrior => warrior.currentDefense += 2)},
    4 : (state, self, target, seed) => true, // redirect
    5 : (state, self, target, seed) => {state.team = state.team.map(warrior => warrior.currentDefense *= 2)},
    6 : (state, self, target, seed) => {target.currentHealth += 5},
    7 : (state, self, target, seed) => {state.team = state.team.map(warrior => warrior.currentHealth += 4)},
    8 : (state, self, target, seed) => {state.team = state.team.map(warrior => warrior.currentHealth += 2)},
    9 : (state, self, target, seed) => {state.team = state.team.map(warrior => warrior.currentDamage += 2)},
    10: (state, self, target, seed) => false, // reduce
    11: (state, self, target, seed) => {target.currentHealth -= attack("normal", target.type, self.currentDamage, seed)},
    12: (state, self, target, seed) => {target.currentHealth -= 2 * attack("normal", target.type, self.currentDamage, seed)},
    13: (state, self, target, seed) => {state.team = state.team.map(warrior => warrior.currentDamage += 3)},
    14: (state, self, target, seed) => {target.currentHealth -= 3 + attack("normal", target.type, self.currentDamage, seed)},
    15: (state, self, target, seed) => {target.currentHealth = 0; self.currentHealth = 0},
    16: (state, self, target, seed) => {target.currentHealth -= attack("lightning", target.type, self.currentDamage)},
    17: (state, self, target, seed) => {target.currentHealth -= attack("lightning", target.type, self.currentDamage, seed)},
    18: (state, self, target, seed) => {target.currentHealth -= 3 + attack("lightning", target.type, self.currentDamage, seed)},
    19: (state, self, target, seed) => {target.currentHealth -= 2 + attack("lightning", target.type, self.currentDamage, seed)},
    20: (state, self, target, seed) => {target.currentHealth -= 2 * attack("lightning", target.type, self.currentDamage, seed)},
    21: (state, self, target, seed) => {target.currentHealth -= attack("fire", target.type, self.currentDamage)},
    22: (state, self, target, seed) => {target.currentHealth -= 1 + attack("fire", target.type, self.currentDamage, seed)},
    23: (state, self, target, seed) => {target.currentHealth -= 3 +  attack("fire", target.type, self.currentDamage, seed)},
    24: (state, self, target, seed) => {target.currentHealth -= 2 * attack("fire", target.type, self.currentDamage, seed)},
    25: (state, self, target, seed) => {target.currentHealth -= attack("fire", target.type, self.currentDamage, seed)},
    26: (state, self, target, seed) => {target.currentHealth -= attack("bullet", target.type, self.currentDamage)},
    27: (state, self, target, seed) => {target.currentHealth -= 2 * attack("bullet", target.type, self.currentDamage, seed)},
    28: (state, self, target, seed) => {target.currentHealth -= attack("bullet", target.type, self.currentDamage, seed)},
    29: (state, self, target, seed) => false, // halved
    30: (state, self, target, seed) => {target.currentHealth -= 3 + attack("bullet", target.type, self.currentDamage, seed)},
}

// returns an attack's damage. Will return max damage if seed is left 0
let attack = (damageType, targetType, range, seed = 0) => {
    let damage = range;
    if (seed) {
        damage = generateNormalRandom(seed, 1, range);
    }

    if (damageType === "normal" || damageType === targetType) {
        return damage;
    } else if (effective(damageType, targetType)) {
        return damage * 2;
    }
    return damage / 2;
}

let effective = (damage, target) => {
    return (damage === "fire" && target === "lightning") || (damage === "lightning" && target === "bullet") || (damage === "bullet" && target === "fire");
}

// generate a normally distributed random number between two bounds, from here: https://stackoverflow.com/a/49434653
let generateNormalRandom = (seed, lowerBound = 0, upperBound = 1) => {
    let rng = SeedRandom(seed)
    let u = 0, v = 0;
    while(u === 0) { u = rng(); } //Converting [0,1) to (0,1)
    while(v === 0) { v = rng(); }

    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1

    if (num > 1 || num < 0) {
        return generateNormalRandom(rng(), lowerBound, upperBound) // resample between 0 and 1
    }

    return Math.floor(num * (upperBound - lowerBound) + lowerBound);
}

export default applyAbility;