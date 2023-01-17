const express = require('express');
const wantedRouter = express.Router(); 
const Item = require('../models/item');
const Wanted = require('../models/wanted');
const User = require('../models/user')

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
wantedRouter.post("/", async (req, res) => {
    try {
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
wantedRouter.put("/:id", async (req, res) => {
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