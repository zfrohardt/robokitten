import express from "express";

import { getRobots, getOneRobot } from '../controllers/robots'
import { getKittens, getOneKitten } from '../controllers/kittens'
import { getCaptains, getOneCaptain } from '../controllers/captains'
import { getVictories, postVictory } from '../controllers/victories'

const router = express.Router()

// should we have a get 5 random robots for pre-game selection?
router.get('/robots', getRobots)
router.get('/robots/:id', getOneRobot)
router.get('/kittens', getKittens)
router.get('/kittens/:id', getOneKitten)
router.get('/captains', getCaptains)
router.get('/captains/:id', getOneCaptain)
router.get('/victories', getVictories)
router.post('/victories', postVictory)

export default router