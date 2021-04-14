const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const Facility = require('../../models/Facility')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route POST api/facilities
// @desc Create a new tennis court facility
// @access Private
router.post('/', auth, async (req, res) => {
  
  try {

    const user = await User.findById(req.user.id).select('-password')

    const newFacility = new Facility({
      operator: req.user.id,
      facilityName: req.body.facilityName,
      courtSurface: req.body.courtSurface,
      numCourts: req.body.numCourts,
      emailAddress: req.body.emailAddress,
      phone: req.body.phone,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      imageURL: req.body.imageURL
    })

    const facility = await newFacility.save()
    res.json(facility)

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error in facility route')
  }
  
})

// @route GET api/facilities
// @desc Get all facilities
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    //Gets the facilities, sort by date with most recent first
    const facilities = await Facility.find().sort({date: -1})
    res.json(facilities)
  } catch(err) {
    res.status(500).send("Server error in get all facilities")
  }
})

// @route GET api/facilities/:id
// @desc Get a facility by its ID
// @access Public
router.get('/:id', async(req, res) =>{
  try {
    const facility = await Facility.findById(req.params.id)

    if(!facility){
      return res.status(404).json({msg: "Facility not found"})
    }

    res.json(facility)
  } catch (err) {

    if(err.kind === 'ObjectId'){
      return res.status(404).json({msg: "Facility not found"})
    }

    res.status(500).send("server error in get facility by Id")
  }
})

router.delete('/:id', auth, async(req, res) => {
  try {
    const facility = await Facility.findById(req.params.id)

    if(!facility) {
      return res.status(404).json({msg: 'Facility to delete not found'})
    }

    //Checks to make sure the user owns the court
    if(facility.operator.toString() !== req.user.id) {
      return res.status(401).json({msg: 'User not authorized to delete facility'})
    }
    else {
      await facility.remove()
      res.json({msg: 'Facility deleted'})
    }

  } catch (err) {
      res.status(500).send('Server error deleting facility')
  }
})


// @route POST api/facilities/:id/comment
// @desc Create a new comment on a tennis facility
// @access Private
router.post('/:id/comment', auth, async (req, res) => {
  
  try {

    const user = await User.findById(req.user.id).select('-password')
    const facility = await Facility.findById(req.params.id)

    const newComment = {
      user: req.user.id,
      text: req.body.text
    }

    facility.comments.unshift(newComment)

    await facility.save()
    res.json(facility.comments)

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error in creating new comments')
  }
  
})


// @route DELETE api/facilities/:facility_id/comment/:comment_id
// @desc Deletes a comment on a tennis facility.  You must be author to delete
// @access Private
router.delete('/:facility_id/comment/:comment_id', auth, async(req, res) => {
  try {
    const facility = await Facility.findById(req.params.facility_id)

    //Get the comment from the post
    const comment = facility.comments.find(comment => comment.id === req.params.comment_id)

    //Make sure the comment exists
    if(!comment){
      return res.status(404).json({msg: 'Comment not found'})
    }

    //Make sure the user is the author before deleting
    if(comment.user.toString() !== req.user.id){
      return res.status(401).json({msg: "User not authorized"})
    }

    //Get the remove index
    const removeIndex = facility.comments
      .map(comment => comment.user.toString()).indexOf(req.user.id)

    facility.comments.splice(removeIndex, 1)

    await facility.save()

    res.json(facility.comments)

  } catch(err) {
    res.status(500).send("Server error deleting comment")
  }
})

module.exports = router