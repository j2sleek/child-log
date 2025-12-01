const mongoose = require('mongoose')

const mealSchema = mongoose.Schema({
  name: String,
  quantity: String,
  remaining: String,
  timeStarted: Date,
  timeEnded: Date,
  child: {
    type: mongoose.Schema.ObjectId,
    ref: 'Child'
  }
})

mealSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.__v
    delete returnedObject._id
  }
})

const Meal = mongoose.model('Meal', mealSchema)

module.exports = Meal