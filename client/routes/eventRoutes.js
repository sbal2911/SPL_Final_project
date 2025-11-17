const express = require('express');

const controller = require('../controllers/eventController');

const router = express.Router();

const {fileUpload} = require('../middleware/fileUpload');

const {validateEvent, validateResult, validateRSVP} = require('../middleware/validator');


//GET /events: send all events to the user
router.get('/',controller.index);

//GET /events/new: send html form to create new events
router.get('/new',controller.new);

//POST /events: create new events
router.post('/create',validateEvent, validateResult,fileUpload,controller.create);

//GET /events/:id: send event by id
router.get('/:id',controller.show);

//GET /events/:id/edit: send event form to edit
router.get('/:id/edit',controller.edit);

router.post('/:id/rsvp',controller.rsvp);

//PUT /events/:id: update the event identified by id
router.put('/:id',validateEvent, validateRSVP, validateResult,fileUpload,controller.update);

//DELETE /events/:id: delete the event identified by id
router.delete('/:id',controller.delete);

// //GET /stories: send all stories to the user
// router.get('/',(req,res)=>{
//    res.send("send all stories"); 
// });

// //GET /stories/new: send html form to create new stories
// router.get('/new',(req,res)=>{
//    res.send("send the new form"); 
// });

// //POST /stories: create new stories
// router.post('/new',(req,res)=>{
//    res.send("created new story"); 
// });

// //GET /stories/:id: send story by id
// router.get('/:id',(req,res)=>{
//     res.send("send the story with id:"+req.params.id); 
// });


// //GET /stories/:id/edit: send story form to edit
// router.get('/:id/edit',(req,res)=>{
//     res.send("send the edit form for story with id:"+req.params.id); 
// });


// //PUT /stories/:id: update the story identified by id
// router.put('/:id/edit',(req,res)=>{
//     res.send("update the story by id:"+req.params.id); 
// });


// //DELETE /stories/:id: delete the story identified by id
// router.delete('/:id/delete',(req,res)=>{
//     res.send("delete the story by id:"+req.params.id); 
// });

module.exports = router;