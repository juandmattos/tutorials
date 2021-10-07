import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const signup = async (req, res, next) => {
  try {
    const existingUser = await User.find({ email: req.body.email })
    // Check existing user
    if (existingUser.length >= 1) {
      return res.status(422).json({ error: 'User Already Exists' })
    } else {
      // Hash password and save user
      const hashedPassword = await bcrypt.hash(req.body.password, 12)
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hashedPassword,
        tutorials: [],
      })
      const createdUser = await user.save()
      const token = jwt.sign({
        email: req.body.email,
        userId: createdUser._id,
      },
      process.env.SECRET,
      {
        expiresIn: '5h'
      })
      res.status(201).json({
        message: 'User Created', 
        userData: {
          token,
          userId: createdUser._id
        }
      })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const login = async (req, res, next) => {
  try {
    // Check if the user already signup
    const existingUser = await User.find({ email: req.body.email })
    if (existingUser.length < 1) {
      return res.status(401).json({ error: 'Auth Failed' })
    }
    // Check the password is valid and create a jwt token to send
    const isValidPassword = await bcrypt.compare(req.body.password, existingUser[0].password)
    if (isValidPassword) {
      const token = jwt.sign({
        email: existingUser[0].email,
        userId: existingUser[0]._id,
      },
      process.env.SECRET,
      {
        expiresIn: '5h'
      })

      res.status(200).json({
        message: 'Auth successful',
        userData: {
          token,
          userId: existingUser[0]._id
        }
      })
    } else {
      res.status(401).json({ error: 'Auth Failed' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}