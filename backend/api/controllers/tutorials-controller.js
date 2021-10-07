import mongoose from 'mongoose'
import Tutorial from '../models/tutorial.js'
import User from '../models/user.js'
import checkAuth from '../middleware/check-auth.js'

export const getAllTutorials = async (req, res, next) => {
  try {
    const allTutorials = await Tutorial
      .find()
      .select('_id title videoUrl description publishedStatus deletedAt')
      .where({ isDeleted: false, publishedStatus: 'public' })
    if (allTutorials) {
      const response = {
        count: allTutorials.length,
        tutorials: allTutorials
      }
      res.status(200).json(response)
    } else {
      res.status(404).json({ error: 'No tutorials found' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getTutorialById = async (req, res, next) => {
  const id = req.params.tutorialId
  try {
    const fetchedTutorial = await Tutorial.findById(id).where({ isDeleted: false })
    res.status(200).json(fetchedTutorial || {})
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const createTutorial = async (req, res, next) => {
  const tutorial = new Tutorial({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    videoUrl: req.body.videoUrl,
    description: req.body.description,
    publishedStatus: req.body.publishedStatus,
    deletedAt: req.body.deletedAt,
    isDeleted: false,
    creator: req.userData.userId
  })

  let user
  try {
    user = await User.findById(req.userData.userId)
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create tutorial' })
  }

  if (!user) {
    return res.status(404).json({ error: 'No user found' })
  }

  try {
    // Create tutorial and associated to the user
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await tutorial.save({ session: sess })
    user.tutorials.push(tutorial)
    await user.save({ session: sess })
    await sess.commitTransaction()

    res.status(201).json({ tutorial })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateTutorial = async (req, res, next) => {
  const id = req.params.tutorialId
  try {
    const tutorial = await Tutorial.findById(id).where({ isDeleted: false })
    if (!tutorial) {
      return res.status(404).json({ error: 'Tutorial not found' })
    }
    if (tutorial.creator.toString() !== req.userData.userId) {
      return res.status(500).json({ error: 'You are not allowed to do this' })
    }

    const updatedTutorial = await Tutorial.findOneAndUpdate(
      { _id: id }, 
      req.body,
      { new : true }
    ).where({ isDeleted: false })
    res.status(200).json(updatedTutorial || {})
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const massDelete = async (req, res, next) => {
  try {
    await Tutorial.updateMany({ creator: req.userData.userId }, { isDeleted: true, deletedAt: new Date() })
    res.status(200).json({ message: 'Mass Deleted all Tutorials', user: req.userData.email })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteTutorial = async (req, res, next) => {
  const id = req.params.tutorialId
  try {
    const fetchedTutorial = await Tutorial.findOneAndUpdate({ _id: id,  creator: req.userData.userId }, { isDeleted: true, deletedAt: new Date() })
    if (fetchedTutorial) {
      res.status(200).json({ message: 'Tutorial was deleted' })
    } else {
      res.status(404).json({ message: 'Tutorial not found or you are not allowed to do this' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}