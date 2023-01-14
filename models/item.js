//Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Item Schema
const itemSchema = Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    image: { type: String}
}, 
    { timestamps: true }
)

// User Model
const Item = mongoose.model('Item', itemSchema);

// Export User Model
module.exports = Item;