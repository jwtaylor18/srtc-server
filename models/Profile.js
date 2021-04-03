const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  address: {
    type: String
  },
  zipCode: {
    type: String
  },
  bio: {
    type: String
  },
  rating: {
    type: String
  },
  lessonFocusAreas: {
    type: [String]
  }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)