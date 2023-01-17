//Dependencies
const express = require('express')
const userRouter = express.Router()
const Item = require('../models/item');
const Wanted = require('../models/wanted');
const User = require('../models/user')

userRouter.get("/", async (req, res) => {
    try {
        // send all wanted
        res.json(await User.find({}))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})


module.exports = userRouter