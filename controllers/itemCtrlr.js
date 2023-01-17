/////INDUCES for items
// PEOPLE INDEX ROUTE
const express = require('express');
const router = express.Router(); 
const Item = require('../models/item');



//item index route
app.get("/items", async (req, res) => {
    try {
        // send all people
        res.json(await Item.find({}))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//item create route
app.post("/items", async (req, res) => {
    try {
        // send all people
        res.json(await Item.create(req.body))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//item delete route
app.delete("/items/:id", async (req, res) => {
    try {
        //send all items
        res.json(await Item.findByIdAndRemove(req.params.id))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//item update route
app.put("/items/:id", async (req, res) => {
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

module.exports = router; //