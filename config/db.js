const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://mohdirfan70097:S9K45Sb6qx7hV1uK@datastoreuser.4icchwu.mongodb.net/?retryWrites=true&w=majority&appName=datastoreuser");
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
