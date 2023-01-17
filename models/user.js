// Dependencies 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
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
        
    );

// User Model
const User = mongoose.model('User', userSchema);

// Export User Model
module.exports = User;