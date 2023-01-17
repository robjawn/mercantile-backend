//Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Wanted Schema
const wantedSchema = Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    condition: { type: String },
    image: { type: String},
    profile: { type: Schema.Types.ObjectId, ref: 'Profile' }
}, 
    { timestamps: true }
)

// User Model
const Wanted = mongoose.model('Wanted', wantedSchema);

// Export User Model
module.exports = Item;