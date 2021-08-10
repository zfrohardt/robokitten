import SeedRandom from 'seedrandom';

const applyAbility = (seed, ability, state, self, target={}) => {
    return abilityLookup[ability.id](state, self, target, seed, ability);
}

const abilityLookup = {
    1 : (state, self, target, seed, ability) => `${ability.name} hasn't been implemented yet. Sorry, you wasted your turn`, // redirect
    2 : (state, self, target, seed, ability) => {
            state.team = state.team.map(warrior => {
                warrior.currentDefense += 1;
                return warrior;
            })
            return `${self.name} used ${ability.name} boosted his team's defense by 1`;
        },
    3 : (state, self, target, seed, ability) => {
            state.team = state.team.map(warrior => {
                warrior.currentDefense += 2;
                return warrior;
            });
            return `${self.name} used ${ability.name} and boosted his team's defense by 2`;
        },
    4 : (state, self, target, seed, ability) => `${ability.name} hasn't been implemented yet. Sorry, you wasted your turn`, // redirect
    5 : (state, self, target, seed, ability) => {
            state.team = state.team.map(warrior => {
                warrior.currentDefense *= 2;
                return warrior;
            });
            return `${self.name} used ${ability.name} and boosted his team's defense by 2x`;
        },
    6 : (state, self, target, seed, ability) => {
            target.currentHealth += 5;
            return `${self.name} used ${ability.name} and healed ${target.name} by 5`
        },
    7 : (state, self, target, seed, ability) => {
            state.team = state.team.map(warrior => {
                warrior.currentHealth += 4;
                return warrior;
            });
            return `${self.name} used ${ability.name} and healed his team for 4`;
        },
    8 : (state, self, target, seed, ability) => {
            state.team = state.team.map(warrior => {
                warrior.currentHealth += 2;
                return warrior;
            });
            return `${self.name} used ${ability.name} and healed his team for 2`
        },
    9 : (state, self, target, seed, ability) => {
            state.team = state.team.map(warrior => {
                warrior.currentDamage += 2;
                return warrior;
            });
            return `${self.name} used ${ability.name} and boosted his team's damage by 2`
        },
    10: (state, self, target, seed, ability) => `${ability.name} hasn't been implemented yet. Sorry, you wasted your turn`, // reduce
    11: (state, self, target, seed, ability) => {
            let damage = attack(ability.type, target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
        },
    12: (state, self, target, seed, ability) => {
            let damage = 2 * attack(ability.type, target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
        },
    13: (state, self, target, seed, ability) => {
            state.team = state.team.map(warrior => {
                warrior.currentDamage += 3;
                return warrior;
            });
            return `${self.name} used ${ability.name} and boosted the damage of his team by 3`;
        },
    14: (state, self, target, seed, ability) => {
            let damage = 3 + attack(ability.type, target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
        },
    15: (state, self, target, seed, ability) => {
            target.currentHealth = 0;
            self.currentHealth = 0;
            return `${self.name} used ${ability.name} and killed ${target.name}`;
        },
    16: (state, self, target, seed, ability) => {
            let damage = attack(ability.type, target.type, self.currentDamage);
            target.currentHealth -= damage;
            return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
        },
    17: (state, self, target, seed, ability) => {
            let damage = attack(ability.type, target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
        },
    18: (state, self, target, seed, ability) => {
            let damage = 3 + attack(ability.type, target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
        },
    19: (state, self, target, seed, ability) => {
            let damage = 2 + attack(ability.type, target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
        },
    20: (state, self, target, seed, ability) => {
        let damage = 2 * attack(ability.type, target.type, self.currentDamage, seed);
        target.currentHealth -= damage;
        return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
        },
    21: (state, self, target, seed, ability) => {
            let damage = attack(ability.type, target.type, self.currentDamage);
            target.currentHealth -= damage;
            return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
        },
    22: (state, self, target, seed, ability) => {
            let damage = 1 + attack(ability.type, target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
        },
    23: (state, self, target, seed, ability) => {
            let damage = 3 + attack(ability.type, target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
        },
    24: (state, self, target, seed, ability) => {
            let damage = 2 * attack(ability.type, target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
    },
    25: (state, self, target, seed, ability) => {
            let damage = attack(ability.type, target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
        },
    26: (state, self, target, seed, ability) => {
            let damage = attack(ability.type, target.type, self.currentDamage);
            target.currentHealth -= damage;
            return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
        },
    27: (state, self, target, seed, ability) => {
            let damage = 2 * attack(ability.type, target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
        },
    28: (state, self, target, seed, ability) => {
            let damage = attack(ability.type, target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
        },
    29: (state, self, target, seed, ability) => `${ability.name} hasn't been implemented yet. Sorry, you wasted your turn`, // halved
    30: (state, self, target, seed, ability) => {
            let damage = 3 + attack(ability.type, target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used ${ability.name} and attacked ${target.name} for ${damage} ${ability.type} damage`;
        },
}

// returns an attack's damage. Will return max damage if seed is left 0
let attack = (damageType, targetType, range, seed = 0) => {
    console.log("Attack seed: " + seed);
    let damage = range;
    if (seed !== 0) {
        damage = generateUniformRandom(seed, 1, range);
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

let generateUniformRandom = (seed, lowerBound = 0, upperBound = 1) => {
    let rng = SeedRandom(seed);
    return Math.floor(rng() * (upperBound - lowerBound)) + lowerBound;
}

// generate a normally distributed random number between two bounds, from here: https://stackoverflow.com/a/49434653
// There may be a bug here, values do not appear to have a random distribution
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