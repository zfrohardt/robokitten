import mongoose from "mongoose";
import Robot from '../models/robot'

export const getAllRobots = async (req, res) => {
    try {
        const robots = await Robot.find()

        res.status(200).json(robots)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getRobot = async (req, res) => {
    const { id: _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No robot found with that id')

    const robot = await Robot.findById(_id).populate("Ability")

    res.json(robot)
}