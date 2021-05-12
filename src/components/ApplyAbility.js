import SeedRandom from 'seedrandom';

const applyAbility = (seed, abilityId, state, self, target={}) => {
    return abilityLookup[abilityId](state, self, target, seed);
}

const abilityLookup = {
    1 : (state, self, target, seed) => "Absorb hasn't been implemented yet. Sorry, you wasted your turn", // redirect
    2 : (state, self, target, seed) => {
            state.team = state.team.map(warrior => warrior.currentDefense += 1);
            return `${self.name} used Harden boosted his team's defense by 1`;
        },
    3 : (state, self, target, seed) => {
            state.team = state.team.map(warrior => warrior.currentDefense += 2);
            return `${self.name} used Protect and boosted his team's defense by 2`;
        },
    4 : (state, self, target, seed) => "Protect hasn't been implemented yet. Sorry, you wasted your turn", // redirect
    5 : (state, self, target, seed) => {
            state.team = state.team.map(warrior => warrior.currentDefense *= 2);
            return `${self.name} used Iron Defense and boosted his team's defense by 2x`;
        },
    6 : (state, self, target, seed) => {
            target.currentHealth += 5;
            return `${self.name} used Helping Hand and healed ${target.name} by 5`
        },
    7 : (state, self, target, seed) => {
            state.team = state.team.map(warrior => warrior.currentHealth += 4);
            return `${self.name} used Mr. Fixit and healed his team for 4`;
        },
    8 : (state, self, target, seed) => {
            state.team = state.team.map(warrior => warrior.currentHealth += 2);
            return `${self.name} used Tune Up and healed his team for 2`
        },
    9 : (state, self, target, seed) => {
            state.team = state.team.map(warrior => warrior.currentDamage += 2);
            return `${self.name} used Battle Cry and boosted his team's damage by 2`
        },
    10: (state, self, target, seed) => "Robot Bark hasn't been implemented yet. Sorry, you wasted your turn", // reduce
    11: (state, self, target, seed) => {
            let damage = attack("normal", target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used Scratch and attacked ${target.name} for ${damage} normal damage`;
        },
    12: (state, self, target, seed) => {
            let damage = 2 * attack("normal", target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used Double Kick and attacked ${target.name} for ${damage} normal damage`;
        },
    13: (state, self, target, seed) => {
            state.team = state.team.map(warrior => warrior.currentDamage += 3);
            return `${self.name} used Rage and boosted the damage of ${warrior.name} by 3`;
        },
    14: (state, self, target, seed) => {
            let damage = 3 + attack("normal", target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used Sonic Boom and attacked ${target.name} for ${damage} normal damage`;
        },
    15: (state, self, target, seed) => {
            target.currentHealth = 0;
            self.currentHealth = 0;
            return `${self.name} used Kamikaze and killed ${target.name}`;
        },
    16: (state, self, target, seed) => {
            let damage = attack("lightning", target.type, self.currentDamage);
            target.currentHealth -= damage;
            return `${self.name} used Lightning Bolt and attacked ${target.name} for ${damage} lightning damage`;
        },
    17: (state, self, target, seed) => {
            let damage = attack("lightning", target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used Shock and attacked ${target.name} for ${damage} lightning damage`;
        },
    18: (state, self, target, seed) => {
            let damage = 3 + attack("lightning", target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used Thunder Punch and attacked ${target.name} for ${damage} lightning damage`;
        },
    19: (state, self, target, seed) => {
            let damage = 2 + attack("lightning", target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used Magnetic Flux and attacked ${target.name} for ${damage} lightning damage`;
        },
    20: (state, self, target, seed) => {
        let damage = 2 * attack("lightning", target.type, self.currentDamage, seed);
        target.currentHealth -= damage;
        return `${self.name} used Zap Cannon and attacked ${target.name} for ${damage} lightning damage`;
        },
    21: (state, self, target, seed) => {
            let damage = attack("fire", target.type, self.currentDamage);
            target.currentHealth -= damage;
            return `${self.name} used Fire Ball and attacked ${target.name} for ${damage} fire damage`;
        },
    22: (state, self, target, seed) => {
            let damage = 1 + attack("fire", target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used Torch and attacked ${target.name} for ${damage} fire damage`;
        },
    23: (state, self, target, seed) => {
            let damage = 3 + attack("fire", target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used Heat Ray and attacked ${target.name} for ${damage} fire damage`;
        },
    24: (state, self, target, seed) => {
            let damage = 2 * attack("fire", target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used Burning Oil and attacked ${target.name} for ${damage} fire damage`;
    },
    25: (state, self, target, seed) => {
            let damage = attack("fire", target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used Flame Slash and attacked ${target.name} for ${damage} fire damage`;
        },
    26: (state, self, target, seed) => {
            let damage = attack("bullet", target.type, self.currentDamage);
            target.currentHealth -= damage;
            return `${self.name} used Sniper and attacked ${target.name} for ${damage} bullet damage`;
        },
    27: (state, self, target, seed) => {
            let damage = 2 * attack("bullet", target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used Billet Barrrage and attacked ${target.name} for ${damage} bullet damage`;
        },
    28: (state, self, target, seed) => {
            let damage = attack("bullet", target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used Open Fire and attacked ${target.name} for ${damage} bullet damage`;
        },
    29: (state, self, target, seed) => "Catnip Shot hasn't been implemented yet. Sorry, you wasted your turn", // halved
    30: (state, self, target, seed) => {
            let damage = 3 + attack("bullet", target.type, self.currentDamage, seed);
            target.currentHealth -= damage;
            return `${self.name} used Robot Rock and attacked ${target.name} for ${damage} bullet damage`;
        },
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