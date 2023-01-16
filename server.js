//Dependencies
require("dotenv").config()
//.env
const { PORT = 4000, MONGODB_URL } = process.env
//express
const express = require("express")
const app = express()
//mongoose
const mongoose = require("mongoose")
//import middleware 
const cors = require("cors")
const morgan = require("morgan")
//data & schemas
const Item = require('./models/item')

//DB CONNECTION 
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error))
    
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

//test route
app.get("/", (req, res) => {
    res.send("hello world")
})

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

//Listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))
