const mongoose = require('mongoose')

const childSchema = new mongoose.Schema({
 name: String,
 dob: Date,
 nickname: String,
 users: [
  {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
 ],
 diapers: [
  {
    type: mongoose.Schema.ObjectId,
    ref: 'Diaper'
  }
 ],
 meals: [
  {
    type: mongoose.Schema.ObjectId,
    ref: 'Meal'
  }
 ],
 moods: [
  {
    type: mongoose.Schema.ObjectId,
    ref: 'Mood'
  }
 ],
 sleeps: [
  {
    type: mongoose.Schema.ObjectId,
    ref: 'Sleep'
  }
 ]
})

childSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
  }
})

const Child = mongoose.model('Child', childSchema)

module.exports = Child