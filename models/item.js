//Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Item Schema
const itemSchema = Schema({
    name: { type: String },
    description: { type: String },
    condition: { type: String },
    image: { type: String },
    user: { type: String },
    contact: { type: String },
    zipcode: { type: String },
    uid: { type: String }
}, 
    { timestamps: true }
)

// User Model
const Item = mongoose.model('Item', itemSchema);

// Export User Model
module.exports = Item;