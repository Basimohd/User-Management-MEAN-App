const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { async } = require('rxjs');

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const checkEmail = await User.findOne({ email: email })
        if (checkEmail) {
            res.json({ emailUsed: "Email Already Exist" })
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                name: username,
                email: email,
                password: hashPassword,
                isUser: true
            })
            await newUser.save();
            res.status(200).json({ message: 'User created successfully' });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Failed to create user' });
    }
}
const verifyUser = async (req, res) => {
    try {
        console.log("asdf")
        const { email, password } = req.body
        const userData = await User.findOne({ email: email })
        if (userData && userData.isUser === true) {
            const isMatch = await bcrypt.compare(password, userData.password)
            if (isMatch) {
                const options = {
                    expiresIn: '1h'
                };
                const token = jwt.sign(req.body, 'mysecretkey', options);
                res.json({ userId: userData._id, userToken: token })
            } else {
                res.json({ passMatch: "Incorrect password" })
            }
        } else {
            res.json({ emailMatch: "Email not found" })
        }
    } catch (error) {

    }
}
const fetchUser = async (req, res) => {
    try {
        console.log("UserData fetch")
        const userId = req.query.id
        await User.findOne({ _id: userId }, { name: 1, email: 1, _id: 0, image: 1 })
            .then((data) => {
                res.json(data)
            })
    } catch (error) {
        console.log(error)
    }
}
const imageUpload = async (req, res) => {
    try {
        const id = req.query.id;
        const image = req.file.filename
        await User.updateOne({ _id: id }, { $set: { image: image } })   
        res.json({message:'Image Uploaded'}) 
    } catch (error) {

    }
}
const imageDelete = async (req, res) => {
    try {
      const id = req.query.id
      await User.updateOne({ _id: id }, { $unset: { image: '' } })
      res.json({ message: 'image removed' })
    } catch (error) {
      console.log(error)
    }
  }
module.exports = {
    createUser,
    verifyUser,
    fetchUser,
    imageUpload,
    imageDelete
}