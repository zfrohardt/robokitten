import mongoose, { Schema } from "mongoose";

const captainSchema = Schema({
    description: String,
    teamBonus: String,
    teamBonusDesc: String,
    type: String
})

const Captain = mongoose.model('Captain', captainSchema)

export default Captain