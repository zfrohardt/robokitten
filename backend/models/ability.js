import mongoose, { Schema } from "mongoose";

const abilitySchema = Schema({
    name: String,
    description: String,
    type: String,
    passive: Boolean,
    target: String
})

const Ability = mongoose.model('Ability', abilitySchema)

export default Ability