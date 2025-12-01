const childRouter = require('express').Router()
const Child = require('../models/Child')
const Diaper = require('../models/Diaper')
const Meal = require('../models/Meal')
const Mood = require('../models/Mood')
const Sleep = require('../models/Sleep')

childRouter.get('/', async (req, res) => {
  const children = await Child.find({}).populate('users', 'name')

  res.status(200).json(children)
})

childRouter.post('/', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }

    const user = req.user
    const child = new Child({...req.body})
    child.users = child.users.concat(user._id)
    const response = await child.save()

    user.children = user.children.concat(response._id)

    return res.status(201).json(child)
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
})

childRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const child = await Child.findById(id)
      .populate('diapers')
      .populate('meals')
      .populate('moods')
      .populate('sleeps')

    res.status(200).json(child)
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
})

childRouter.put('/:id', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'unauthorized'
      })
    }
    
    const user = req.user
    const id = req.params.id
    const childToUpdate = await Child.findById(id)
    const users = childToUpdate.users.map(user => user.toString())

    if (!(users.includes(user._id.toString()))) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }

    const update = req.body
    const updatedChild = {...childToUpdate, ...update}
    const completedUpdate = await updatedChild.save()
    res.status(204).json(completedUpdate)
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
})

childRouter.delete('/:id', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'unauthorized'
      })
    }
    const user = req.user
    const id = req.params.id
    const child = await Child.findById(id)
    const users = child.users.map(user => user.toString())

    if (!(users.includes(user._id.toString()))) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }

    await Child.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
})

childRouter.post('/:id/diapers', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'unauthorized'
      })
    }
    const user = req.user
    const id = req.params.id
    const child = await Child.findById(id)
    const users = child.users.map(user => user.toString())

    if (!(users.includes(user._id.toString()))) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }

    const { time, reason, info } = req.body
    const diaper = new Diaper({
      time,
      reason,
      info
    })
    diaper.child = id
    const response = await diaper.save()
    child.diapers = child.diapers.concat(response._id)
    await child.save()

    res.status(201).json(response)
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
})

childRouter.post('/:id/meals', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'unauthorized'
      })
    }
    const user = req.user
    const id = req.params.id
    const child = await Child.findById(id)
    const users = child.users.map(user => user.toString())

    if (!(users.includes(user._id.toString()))) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }

    const body = req.body
    const meal = new Meal({...body})
    meal.child = id
    const response = await meal.save()
    child.meals = child.meals.concat(response._id)
    await child.save()

    res.status(201).json(response)
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
})

childRouter.post('/:id/moods', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'unauthorized'
      })
    }
    const user = req.user
    const id = req.params.id
    const child = await Child.findById(id)
    const users = child.users.map(user => user.toString())

    if (!(users.includes(user._id.toString()))) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }

    const body = req.body
    const mood = new Mood({...body})
    mood.child = id
    const response = await mood.save()
    child.moods = child.moods.concat(response._id)
    await child.save()

    res.status(201).json(response)
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
})

childRouter.post('/:id/sleeps', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'unauthorized'
      })
    }
    const user = req.user
    const id = req.params.id
    const child = await Child.findById(id)
    const users = child.users.map(user => user.toString())

    if (!(users.includes(user._id.toString()))) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }

    const body = req.body
    const sleep = new Sleep({...body})
    sleep.child = id
    const response = await sleep.save()
    child.sleeps = child.sleeps.concat(response._id)
    await child.save()

    res.status(201).json(response)
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
})

module.exports = childRouter