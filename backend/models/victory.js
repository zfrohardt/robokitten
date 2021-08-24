import mongoose from "mongoose";
const { Schema } = mongoose

const victorySchema = Schema({
    captainName: String,
    captain: {
        captainName: String,
        captainInfo: {
        type: Schema.Types.ObjectId,
        ref: "Captain"
    }},
    troops: [{
        troopName: String,
        troopInfo: {
        type: Schema.Types.ObjectId,
        ref: "Robot"
    }}],
    eventLog: [String]
})

const Victory = mongoose.model('Victory', victorySchema)

export default Victory