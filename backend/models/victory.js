import mongoose from "mongoose";
const { Schema } = mongoose

const victorySchema = Schema({
    captain: {
        type: Schema.Types.ObjectId,
        ref: "Captain"
    },
    troops: [{
        type: Schema.Types.ObjectId,
        ref: "Robot"
    }],
    eventLog: [String]
})

const Victory = mongoose.model('Victory', victorySchema)

export default Victory