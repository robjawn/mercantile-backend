/////INDUCES for items
// PEOPLE INDEX ROUTE
const express = require('express');
const itemRouter = express.Router(); 
const Item = require('../models/item');
const Wanted = require('../models/wanted');
const User = require('../models/user')

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
itemRouter.post("/new", async (req, res) => {
    try {
        // send all people
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