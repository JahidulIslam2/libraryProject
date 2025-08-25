import express from "express";
import connectDB from "./app";


const app=express();
app.use(express.json());





const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`book server running on ${port}`)
    connectDB();
});