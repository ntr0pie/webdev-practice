const mongoose = require('mongoose');

const dbConnectionStr = 'mongodb+srv://ntr0pie:ntr0pie@cluster0.zpxcr8p.mongodb.net/';
const options = {useNewUrlParser: true, useUnifiedTopology: true};

const connectDb = async() => {
    try {
        const connect = await mongoose.connect(dbConnectionStr, options);
        console.log("[MongoDb] Connected");
    } catch (error) {
        console.log("Failed to config MongoDB: ", error);
        process.exit(1);
    }
}

module.exports = connectDb;



