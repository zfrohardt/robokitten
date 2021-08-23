import mongoose from "mongoose";
import Kitten from '../models/kitten.js'
import Ability from '../models/ability.js'

export const getAllKittens = async (req, res) => {
    try {
        const kittens = await Kitten.find().populate("abilityIds")

        res.status(200).json(kittens)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getKitten = async (req, res) => {
    const { id: _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No kitten found with that id')
    }

    const kitten = await Kitten.findById(_id).populate("abilityIds")
    res.json(kitten)
}