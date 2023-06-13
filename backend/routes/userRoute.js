const express = require('express')
const user_route = express()
const userController = require('../controllers/userController')
const uploadFile = require("../middleware/multer");

user_route.post('/register',userController.createUser)
user_route.post('/login',userController.verifyUser)
user_route.get('/profile',userController.fetchUser)

module.exports = user_route




