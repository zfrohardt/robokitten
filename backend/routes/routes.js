import express from "express";

import { getAllRobots, getRobot } from '../controllers/robots'
import { getAllKittens, getKitten } from '../controllers/kittens'
import { getAllCaptains, getCaptain } from '../controllers/captains'
import { getAllVictories, postVictory } from '../controllers/victories'

const router = express.Router()

// should we have a get 5 random robots for pre-game selection?
router.get('/robots', getAllRobots)
router.get('/robots/:id', getRobot)
router.get('/kittens', getAllKittens)
router.get('/kittens/:id', getKitten)
router.get('/captains', getAllCaptains)
router.get('/captains/:id', getCaptain)
router.get('/victories', getAllVictories)
router.post('/victories', postVictory)

export default router