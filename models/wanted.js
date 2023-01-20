//Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Wanted Schema
const wantedSchema = Schema({
    name: { type: String },
    description: { type: String },
    user: { type: String },
    contact: { type: String },
    zipcode: { type: String },
    uid: { type: String }
}, 
    { timestamps: true }
)

// User Model
const Wanted = mongoose.model('Wanted', wantedSchema);

// Export User Model
module.exports = Wanted;