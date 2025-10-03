import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectDB = async()=>{
   await mongoose.connect(process.env.DB_URI)
   .then(()=>{
    console.log('database connected')
   })
   .catch((err)=>{
    console.log('db connection error', err)
   })
}

export default connectDB