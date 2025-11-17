const express = require('express');
const controller = require('../controllers/userController');
const { logInLimitter } = require('../middleware/rateLimiters');
const {validateSignUp, validateLogIn, validateResult} = require('../middleware/validator');

const router = express.Router();


//GET /users/new: send html form for creating a new user account
router.get('/new', controller.new);

//POST /users: create a new user account
// router.post('/', controller.create);
router.post('/', validateSignUp, validateResult, controller.create);

//GET /users/login: send html for logging in
router.get('/login', controller.getUserLogin);

//POST /users/login: authenticate user's login
// router.post('/login', logInLimitter, controller.login);

router.post('/login', logInLimitter, validateLogIn ,validateResult, controller.login);

//GET /users/profile: send user's profile page
router.get('/profile', controller.profile);

//POST /users/logout: logout a user
router.get('/logout', controller.logout);

module.exports = router;