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

//DB CONNECTION 
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error))


//Listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))