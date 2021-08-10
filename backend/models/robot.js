import mongoose, { Schema } from "mongoose";

const robotSchema = Schema({
    class: String,
    description: String,
    baseDamage: Number,
    maxHealth: Number,
    baseDefense: Number,
    type: String,
    abilities: [{
        type: Schema.Types.ObjectId,
        ref: "Ability"
    }],
    cat: Boolean
})

const Robot = mongoose.model('Robot', robotSchema)

export default Robot