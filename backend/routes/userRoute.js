const express = require('express')
const user_route = express()
const userController = require('../controllers/userController')
const multer = require("../middleware/multer");
const upload = multer.upload;

user_route.post('/register',userController.createUser)
user_route.post('/login',userController.verifyUser)
user_route.get('/profile',userController.fetchUser)
user_route.delete('/deleteImage',userController.imageDelete)
user_route.post('/uploadImage',upload.single('image'),userController.imageUpload)

module.exports = user_route




