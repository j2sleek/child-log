const mongoose = require('mongoose')

const sleepSchema = mongoose.Schema({
  startTime: Date,
  endTime: Date,
  child: {
    type: mongoose.Schema.ObjectId,
    ref: 'Child'
  }
})

sleepSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Sleep = mongoose.model('Sleep', sleepSchema)

module.exports = Sleep