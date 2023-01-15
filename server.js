//Dependencies
require("dotenv").config()
//.env
const { PORT = 3000, MONGODB_URI } = process.env
//express
const express = require("express")
const app = express()
//mongoose
const mongoose = require("mongoose")
//import middleware 
const cors = require("cors")
const morgan = require("morgan")
const Item = require("./models/item")


//DB CONNECTION 
mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error))

mongoose.set('strictQuery', true);// only allows for strict informaiton reguarding our schema to be added 

    
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies


/////Routes 
app.get("/", (req, res) => {
    res.send("hello world");
});

// //i believe this will add controller milddle ware and handles request and sends a response 
// const itemController = require("./controllers/itemCtrlr");
// app.use('/item', itemController ); 

////index controller 
//i
app.get("/item", async (req, res) => {
    try {
        // send all people
        res.json(await Item.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

//c
//Listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))

