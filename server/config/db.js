//Connection to monoDB
const mongoose = require('mongoose');

//connect to mongoDB using mongoose
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected successfully!");

    }catch(error){
        console.error("MongoDB connection failed", error.message);
        process.exit(1); // Optional: exit the app if DB connection fails
    }
}

module.exports = connectDB;

