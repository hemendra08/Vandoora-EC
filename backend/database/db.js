import mongoose from 'mongoose';
import 'dotenv/config.js';

const DB_URI = `${process.env.MONGO_URI}/Vandoora`

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("MongoDB connection succesfull");

    } catch (err) {
        console.log('MongoDb connectioni failed:', err);
    }
}

export default connectDB;
