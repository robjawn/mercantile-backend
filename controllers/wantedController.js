const express = require('express');
const wantedRouter = express.Router(); 
const Wanted = require('../models/wanted');

router.get("/", async (req, res) => {
    try {
        // send all wanted
        res.json(await Wanted.find({}))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//Wanted create route
router.post("/", async (req, res) => {
    try {
        // send all wanted
        res.json(await Wanted.create(req.body))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//Wanted delete route
router.delete("/:id", async (req, res) => {
    try {
        //send all wanted
        res.json(await Wanted.findByIdAndRemove(req.params.id))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//Wanted update route
router.put("/:id", async (req, res) => {
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

module.exports = router