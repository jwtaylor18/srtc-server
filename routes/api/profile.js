const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const {check, validationResult} = require('express-validator/check')

// @route GET api/profile/me
// @desc Get current users profile
// @access Public
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id}).populate('user',
    ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({msg: 'No profile found for this user'})
    }

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route POST api/profile
// @desc Create or update user profile
// @access Private
router.post('/', auth, async (req, res) => {

  const {
    address,
    zipCode,
    rating,
    lessonFocusAreas,
    bio
  } = req.body;

  //Build profile object
  const profileFields = {}
  profileFields.user = req.user.id
  if (address) profileFields.address = address
  if (zipCode) profileFields.zipCode = zipCode
  if (bio) profileFields.bio = bio
  if (rating) profileFields.rating = rating
  if (lessonFocusAreas) {
    profileFields.lessonFocusAreas = lessonFocusAreas.split(',').map(area => area.trim())
  }

  try {
    let profile = await Profile.findOne({user: req.user.id})
    
    //Update profile if found
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        {user: req.user.id}, 
        {$set: profileFields},
        {new: true}
      )
      return res.json(profile)
    }

    //Create profile if it doesn't exist yet
    profile = new Profile(profileFields)
    await profile.save();
    res.json(profile)

  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }

})


// @route GET api/profile/
// @desc Get all profiles
// @access Public
router.get('/',  async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'isOperator', 'email'])
    res.json(profiles)
    
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }

})


// @route GET api/profile/user/:user_id
// @desc Get profile by userID
// @access Public
router.get('/user/:user_id',  async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'email'])
    if(!profile) {
      return res.status(400).json({msg: 'Profile not found'})
    } 
    res.json(profile)   
  } catch (err) {
    console.log(err.message)
    if(err.kind =='ObjectId') {
      return res.status(400).json({msg: 'Profile not found'})
    }
    res.status(500).send('Server Error')
  }
})


// @route DELETE api/profile/
// @desc Delete profile, user, and reservations
// @access Private
router.delete('/', auth, async (req, res) => {
  try {

    //TODO: also removes users reservations
    //Remove profile
    await Profile.findOneAndRemove({user: req.user.id})

    //Remove user
    await User.findOneAndRemove({_id: req.user.id})
    res.json({msg: 'User deleted'})
    
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }

})

module.exports = router