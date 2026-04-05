import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({debug: true});


const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB successfully!");
    }
    catch(error){
        console.log("Error connecting to MongoDB: ", error);
    }

}

export default connectToMongoDB;