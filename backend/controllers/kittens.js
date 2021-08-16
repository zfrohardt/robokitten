import mongoose from "mongoose";
import Kitten from '../models/kitten'

export const getKittens = async (req, res) => {
    try {
        const kittens = await Kitten.find()

        res.status(200).json(kittens)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getOneKitten = async (req, res) => {
    const { id: _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No kitten found with that id')

    const kitten = await Kitten.findById(_id).populate("Ability")

    res.json(kitten)
}