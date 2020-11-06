const mongoose = require('mongoose');
const keys = require('./dev');

const connectDB = async () => {
    try {
        await mongoose.connect(keys.mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected!!')
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;