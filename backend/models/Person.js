const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
 name: String,
 dob: Date,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person