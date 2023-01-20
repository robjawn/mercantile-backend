// Dependencies
const express = require('express');
const wantedRouter = express.Router(); 
const Item = require('../models/item');
const Wanted = require('../models/wanted');
const User = require('../models/user')
const admin = require('firebase-admin')
const { getAuth } = require('firebase-admin/auth')

wantedRouter.use(async function(req, res, next) {
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

wantedRouter.get("/", async (req, res) => {
    try {
        // send all wanted
        res.json(await Wanted.find({}))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//Wanted create route
wantedRouter.post("/new", async (req, res) => {
    try {
        // attach uid
        req.body.uid = req.user.uid
        req.body.user = req.user.name
        req.body.contact = req.user.email
        // send all wanted
        res.json(await Wanted.create(req.body))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//Wanted delete route
wantedRouter.delete("/:id", async (req, res) => {
    try {
        //send all wanted
        res.json(await Wanted.findByIdAndRemove(req.params.id))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//Wanted update route
wantedRouter.put("/update/:id", async (req, res) => {
    try {
        //send all wanted
        res.json(
            await Wanted.findByIdAndUpdate(req.params.id, req.body, { new: true })
        )
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

module.exports = wantedRouter