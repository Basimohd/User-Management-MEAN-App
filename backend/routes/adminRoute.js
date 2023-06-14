const express = require('express')
const user_route = express()
const adminController = require('../controllers/adminController')
const multer = require("../middleware/multer");
const upload = multer.upload;

user_route.post('/login',adminController.verifyAdmin)
user_route.get('/users',adminController.getUsers)
user_route.delete('/deleteUser',adminController.deleteUser)
user_route.patch('/update',adminController.updateUser)

module.exports = user_route
