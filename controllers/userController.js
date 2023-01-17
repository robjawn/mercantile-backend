//Dependencies
const express = require('express')
const userRouter = express.Router
const Item = require('../models/item');
const Wanted = require('../models/wanted');
const User = require('../models/user')


module.exports = userRouter