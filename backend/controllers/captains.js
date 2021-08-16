import mongoose from "mongoose";
import Captain from '../models/captain'

export const getCaptains = async (req, res) => {
    try {
        const captains = await Captain.find()

        res.status(200).json(captains)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getOneCaptain = async (req, res) => {
    const { id: _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No captain found with that id')

    const captain = await Captain.findById(_id)

    res.json(captain)
}