import express from "express";

import mongoose from "mongoose";



const app=express();
app.use(express.json());





const mongoURL=process.env.DATABASE_URL || "mongodb://localhost:27017/library-DB";

const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`book server running on ${port}`)
   
});



const connectDB=async() =>{
    try{
        await mongoose.connect(mongoURL);
        console.log("✔Connected to MongoDB");
    }catch(error){
        console.error("❌Error connecting to MongoDB",error);
    }
}

connectDB();