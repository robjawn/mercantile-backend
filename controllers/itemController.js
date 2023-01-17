/////INDUCES for items
// PEOPLE INDEX ROUTE
const express = require('express');
const itemRouter = express.Router(); 
const Item = require('../models/item');

//item index route
app.get("/", async (req, res) => {
    try {
        // send all people
        res.json(await Item.find({}))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//item create route
app.post("/", async (req, res) => {
    try {
        // send all people
        res.json(await Item.create(req.body))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//item delete route
app.delete(":id", async (req, res) => {
    try {
        //send all items
        res.json(await Item.findByIdAndRemove(req.params.id))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//item update route
app.put("/:id", async (req, res) => {
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

module.exports = router; 