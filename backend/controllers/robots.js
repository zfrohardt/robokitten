import mongoose from "mongoose";
import Robot from '../models/robot.js'
import Ability from '../models/ability.js'

let abilitySort = (x, y) => {
    if (x.passive === y.passive) {
        return (x.name < y.name)? -1 : 1;
    }
    return (x.passive)? 1 : -1;
}

export const getAllRobots = async (req, res) => {
    try {
        const robots = await Robot.find().populate("abilityIds")
        const robotsSortedAbilities = robots.map(robot => {
            robot.abilityIds.sort(abilitySort)
            return robot
        })

        res.status(200).json(robotsSortedAbilities)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getRobot = async (req, res) => {
    const { id: _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No robot found with that id')
    }

    const robot = await Robot.findById(_id).populate("abilityIds")
    robot.abilityIds.sort(abilitySort)
    res.json(robot)
}