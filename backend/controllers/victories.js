import mongoose from "mongoose";
import Victory from '../models/victory'

export const getVictories = async (req, res) => {
    try {
        const victories = await Victory.find()

        res.status(200).json(victories)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const postVictory = async (req, res) => {
    const victory = req.body
    const newVictory = new Victory(victory)

    try {
        await newVictory.save()
        res.status(201).json(newVictory)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}