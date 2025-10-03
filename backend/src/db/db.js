import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
      try{
         await mongoose.connect(process.env.DB_URI)
         console.log('database connected')
      
      }
      catch(err) {
         console.log('db connection error', err)
      }
}

export default connectDB