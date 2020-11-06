const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,

    first_name: String,

    last_name: String,

    email: {
        type: String,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },

    date_of_birth: Date,

    sex: String,

    state_of_origin: String,

    occupation: String,

    residential_address: String,

    image: {
        type: String,
        unique: true
    },
    joinedOn: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('users', userSchema);