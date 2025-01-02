import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import {userRouter} from './userRouter';
dotenv.config()

const app = express();
app.use(express.json());
app.use('/api/v1/users', userRouter);


mongoose.connect('mongodb+srv://kesagoniyashwanth:wHf2AFIye2clfg6s@cluster0.0a3g4.mongodb.net/Secondbrain').then(()=>{
    console.log('mongodb is connected')
})



app.listen(process.env.PORT,()=>{
console.log("Port is ruuning at " + process.env.PORT);
}) 