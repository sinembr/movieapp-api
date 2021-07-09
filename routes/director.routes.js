const express = require('express');
const router = express.Router()

//import the model
const DirectorModel = require('../models/Director')

//GET all directors 
// router.get('/', (req,res,next) =>{
//   // res.send('GET request to Director Page..')
//   DirectorModel.find()
//   .then((directorList)=>{res.json(directorList)})
//   .catch((err)=>{next({message:err})})
// })

//GET all directors with their movies
router.get('/', (req,res,next) =>{
  DirectorModel.aggregate([
    {
      $lookup:{
        from:'movies',
        localField:'_id',
        foreignField:'director_id',
        as:'movies'
      }
    },
    {
      $project:{
        _id:1,
        name:1,
        lastname:true,
        'movies.title':true,
        'movies.imdb_score':1
      }
    }
  ])
  .then((directorList)=>{res.json(directorList)})
  .catch((err)=>{next({message:err})})
})

//GET a Director api/directors/:directorId
const mongoose = require('mongoose')
router.get('/:directorId',(req,res,next)=>{
  DirectorModel.aggregate([
    {
      $match:{_id:mongoose.Types.ObjectId(req.params.directorId)}
    },
    {
      $lookup:{
        from:'movies',
        localField:'_id',
        foreignField:'director_id',
        as:'movies'
      }
    }
  ])
  .then((data)=>{res.json(data)})
  .catch((err)=>{next({message:err})})
})

//Create a new director in mongoDB
router.post('/',(req,res,next)=>{
  const newDirector = new DirectorModel(req.body)
  newDirector.save()
  .then((director)=>{res.json(director)})
  .catch((err)=>{next({message:err})})
})

//Update a Director api/directors/:directorId
router.put('/:directorId',(req,res,next)=>{
  DirectionModel.findByIdAndUpdate(req.params.directorId, req.body,{new:true})
  .then((director)=>{res.json(director)})
  .catch((err)=>{next({message:err})})
})

//Delete a Director api/directors/:directorId
router.delete('/:directorId',(req,res,next)=>{
  DirectorModel.findByIdAndRemove(req.params.directorId)
  .then((director)=>{res.json(director)})
  .catch((err)=>{next({message:err})})
})

module.exports = router