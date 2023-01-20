//Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Item Schema
const itemSchema = Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    condition: { type: String },
    image: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    zipcode: { type: String },
   type: Boolean,
    default: false
}, 
    { timestamps: true }
)

// User Model
const Item = mongoose.model('Item', itemSchema);

// Export User Model
module.exports = Item;