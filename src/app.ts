import mongoose from "mongoose";




const mongoURL=process.env.DATABASE_URL || "mongodb://localhost:27017/library-DB";


const connectDB=async() =>{
    try{
        await mongoose.connect(mongoURL);
        console.log("✔Connected to MongoDB");
    }catch(error){
        console.error("❌Error connecting to MongoDB",error);
    }
}


export default connectDB;
