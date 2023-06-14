const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { async } = require('rxjs');

const verifyAdmin = async (req, res) => {
    try {
        console.log("asdf")
        const { email, password } = req.body
        const userData = await User.findOne({ email: email })
        if (userData && userData.isAdmin === true) {
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
const getUsers = async(req,res)=>{
    try {
        const users = await User.find({ isUser: true})
        res.json({allUsers:users})
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        console.log("me")
      const userId = req.query.id
      await User.findByIdAndDelete(userId)
        .then(() => {
          res.json({ message: "User Deleted!" })
        })
    } catch (error) {
      console.log(error)
    }
}

const updateUser = async (req, res) => {
    try {
      const { name, email } = req.body
      await User.findOneAndUpdate({ email: email }, { $set: { name: name, email: email } })
        .then(() => {
          res.json({ message: 'User updated successfully' })
        })
    } catch (error) {
      console.log(error)
    }
  }

module.exports = {
    verifyAdmin,
    getUsers,
    deleteUser,
    updateUser
}