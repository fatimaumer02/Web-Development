import express from "express";
import mongoose from "mongoose";
import User from "./model/userSchema.js";
import userRouter from "./routers/userRouters.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 4006;

app.use(express.json());
app.use('/',  userRouter)

mongoose.connect(process.env.MONGODB_URL )
.then(()=>{
    console.log("mongodb is connected  ")
})
.catch((err)=>{
    console.log("monogdb is not connected")
})

app.get("/", (req , res)=>{
    res.json({message : "api is running"})
})


app.listen(port ,()=>{
    console.log(`Server is ruuning in port ${port}`)
})