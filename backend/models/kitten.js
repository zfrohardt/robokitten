import mongoose from "mongoose";
const { Schema } = mongoose

const kittenSchema = Schema({
    class: String,
    description: String,
    baseDamage: Number,
    maxHealth: Number,
    baseDefense: Number,
    type: String,
    abilities: [{
        type: Schema.Types.ObjectId,
        ref: 'Ability'
    }],
    cat: Boolean
})

const Kitten = mongoose.model('Kitten', kittenSchema)

export default Kitten