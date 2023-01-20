//Dependencies
const { PORT = 4000, MONGODB_URL, PRIVATE_KEY_ID, PRIVATE_KEY, CLIENT_ID } = process.env
const express = require('express');
const itemRouter = express.Router(); 
const Item = require('../models/item');
const Wanted = require('../models/wanted');
const User = require('../models/user')
const admin = require('firebase-admin')
const { getAuth } = require('firebase-admin/auth')

itemRouter.use(async function(req, res, next) {
    try{
         const token = req.get('Authorization');
         if(token) {
             const user = await getAuth().verifyIdToken(token.replace('Bearer ', ''))
             console.log(user)
             req.user = user
         } else {
             req.user = null
         }
    } catch (error) {
         req.user = null
    }
 
     next() // this function invokes the next middleware function in the middleware stack
 })

function isAuthenticated(req, res, next) {
    if(req.user) return next()
        res.status(401).json({ message: 'You must be logged in to do that'
    })
}

//item index route
itemRouter.get("/", async (req, res) => {
    try {
        // send all people
        res.json(await Item.find({}))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//item create route
itemRouter.post("/new", isAuthenticated, async (req, res) => {
    try {
        // attach uid
        req.body.uid = req.user.uid
        req.body.user = req.user.name
        req.body.contact = req.user.email
        ///send new item
        res.json(await Item.create(req.body))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//item delete route
itemRouter.delete("/:id", async (req, res) => {
    try {
        //send all items
        res.json(await Item.findByIdAndRemove(req.params.id))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//item update route
itemRouter.put("/update/:id", async (req, res) => {
    try {
        //send all items
        res.json(
            await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
        )
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

module.exports = itemRouter; 