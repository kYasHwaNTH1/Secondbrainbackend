import express from 'express'
import dotenv from 'dotenv'
import {userRouter} from './userRouter';
dotenv.config()

const app = express();

app.use('/api/v1/users', userRouter);


app.listen(process.env.PORT,()=>{
console.log("Port is ruuning at " + process.env.PORT);
}) 