import { Router } from "express";
import {z} from 'zod'
import { UserModel } from './db';
import jwt from "jsonwebtoken";
const userRouter= Router();

userRouter.post('/signup',async (req, res) => {
    const {username,password} = req.body;
    const isexists = await UserModel.findOne({username:username})
  if(isexists){
     res.status(200).json({msg: "User already exists"})
  }
    await UserModel.create({
        username:username,
        password:password
    })
     res.status(200).json({msg: "User created"})
})

userRouter.post('/signin',async(req,res)=>{
  const {username,password} = req.body;
  try{
   const isexists = await UserModel.findOne({username:username, password:password});
   if(!isexists){
    res.status(403).json({msg:"User doesn't exist"})
    return ;
   }
   const token = jwt.sign({id:isexists._id},'Random323903Numbersrasalesliceses');

   res.status(200).json({token:token});
}
catch(error){
   res.status(500).json({msg:"Server Error"})
}
})

userRouter.post('/content',async(req,res)=>{
    
})
userRouter.get('/content',async(req,res)=>{

})
userRouter.delete('/content',async(req,res)=>{

})

userRouter.post('/brain/share',async(req,res)=>{

})

export { userRouter };