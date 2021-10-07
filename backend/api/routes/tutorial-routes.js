import express from 'express'
import mongoose from 'mongoose'
import Tutorial from '../models/tutorial.js'
import checkAuth from '../middleware/check-auth.js'
import {
  getAllTutorials,
  getTutorialById,
  createTutorial,
  updateTutorial,
  massDelete,
  deleteTutorial
} from '../controllers/tutorials-controller.js'

const router = express.Router()

// get all tutorials
router.get('/', getAllTutorials)
// get a tutorial
router.get('/:tutorialId', getTutorialById)
// create a tutorial
router.post('/', checkAuth, createTutorial)
// update a tutorial
router.put('/:tutorialId', checkAuth, updateTutorial)
// mass delete tutorials
router.delete('/mass_delete', checkAuth, massDelete)
// delete a tutorial
router.delete('/:tutorialId', checkAuth, deleteTutorial)

export default router
