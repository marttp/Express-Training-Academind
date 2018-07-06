const express = require('express');
//export to app.js
const router = express.Router();

const UserController = require('../controllers/users');

const checkAuth = require('../middleware/check-auth');
//Signup Module
router.post('/signup',UserController.users_signup);

//Login Module
router.post('/login',UserController.users_login);

//Delete Module
router.delete('/:userID',checkAuth,UserController.users_delete);

module.exports = router;