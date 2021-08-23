import mongoose from "mongoose";
import Kitten from '../models/kitten.js'
import Ability from '../models/ability.js'

let abilitySort = (x, y) => {
    if (x.passive === y.passive) {
        return (x.name < y.name)? -1 : 1;
    }
    return (x.passive)? 1 : -1;
}

export const getAllKittens = async (req, res) => {
    try {
        const kittens = await Kitten.find().populate("abilityIds")
        const kittensSortedAbilities = kittens.map(kitten => {
            kitten.abilityIds.sort(abilitySort)
            return kitten
        })

        res.status(200).json(kittensSortedAbilities)
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
    kitten.abilityIds.sort(abilitySort)
    res.json(kitten)
}