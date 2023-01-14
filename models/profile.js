//Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Item Schema
const profileSchema = Schema({
    name: { type: String, required: true},
    about: { type: String},
    location: { type: String },
    avatar: { type: String},
    items: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Item' 
    }]
}, 
    { timestamps: true }
)

// User Model
const Item = mongoose.model('Profile', profileSchema);

// Export User Model
module.exports = Profile;