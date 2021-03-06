import mongoose from "mongoose";
import Victory from '../models/victory.js'
import Captain from '../models/captain.js'
import Robot from '../models/robot.js'

export const getAllVictories = async (req, res) => {
    try {
        const victories = await Victory.find().populate('captain.captainInfo').populate('troops.troopInfo')

        res.status(200).json(victories)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// We may want a getVictory action

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