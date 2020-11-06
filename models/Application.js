const mongoose = require('mongoose');
const { Schema } = mongoose;

const ApplicationSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    application_type: String,

    test_score: String,

    state: String,

    renewal_type: String,

    residential_address: String,

    added: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('applications', ApplicationSchema);