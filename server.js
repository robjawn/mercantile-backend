//Dependencies
require("dotenv").config()
//.env
const { PORT = 4000, MONGODB_URL, PRIVATE_KEY_ID, PRIVATE_KEY, CLIENT_ID } = process.env
//express
const express = require("express")
const app = express()
//firebase
const admin = require('firebase-admin')
const { getAuth } = require('firebase-admin/auth')
//mongoose
const mongoose = require("mongoose")
//import middleware 
const cors = require("cors")
const morgan = require("morgan")
//models
const Item = require('./models/item')
const Wanted = require('./models/wanted')
const User = require('./models/user')

admin.initializeApp({ 
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "m3rcantile-8f10b",
        "private_key_id": PRIVATE_KEY_ID,
        "private_key": PRIVATE_KEY.replace('\n', ''),
        "client_email": "firebase-adminsdk-l7d6r@m3rcantile-8f10b.iam.gserviceaccount.com",
        "client_id": CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l7d6r%40m3rcantile-8f10b.iam.gserviceaccount.com" 
    })
})

//DB CONNECTION 
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(" this is the error " + error))
    
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies
// Authentication/Authorization 
app.use(async function(req, res, next) {
    const token = req.get('Authorization');
    if(token) {
        const user = await getAuth().verifyIdToken(token.replace('Bearer ', ''))
        console.log(user)
    }
    next() // this function invokes the next middleware function in the middleware stack
})

/////routes////
////controllers for the routes///
////below is the watned controller test.

const wantedController = require("./controllers/wantedController");
app.use('/wanted', wantedController);
const itemController = require("./controllers/itemController");
app.use('/items', itemController);
const userController = require("./controllers/userController")
app.use('/user', userController)



//test route
app.get("/", (req, res) => {
    res.send("hello world")
})

// //item index route
// app.get("/items", async (req, res) => {
//     try {
//         // send all people
//         res.json(await Item.find({}))
//     } catch (error) {
//         //send error
//         res.status(400).json(error)
//     }
// })

// //item create route
// app.post("/items", async (req, res) => {
//     try {
//         // send all people
//         res.json(await Item.create(req.body))
//     } catch (error) {
//         //send error
//         res.status(400).json(error)
//     }
// })

// //item delete route
// app.delete("/items/:id", async (req, res) => {
//     try {
//         //send all items
//         res.json(await Item.findByIdAndRemove(req.params.id))
//     } catch (error) {
//         //send error
//         res.status(400).json(error)
//     }
// })

// //item update route
// app.put("/items/:id", async (req, res) => {
//     try {
//         //send all items
//         res.json(
//             await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         )
//     } catch (error) {
//         //send error
//         res.status(400).json(error)
//     }
// })

//Listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))
