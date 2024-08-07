const mongoose = require("mongoose");

const mongoURI = 'mongourl' ; // for security reasons i am removing the url from public view 

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongoDB;
