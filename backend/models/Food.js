const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
  name: String,
  quantity_made: String,
  quantity_consumed: String,
  time: {
    type: Date,
    default: Date.now  
  }
})

foodSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.__v
    delete returnedObject._id
  }
})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food