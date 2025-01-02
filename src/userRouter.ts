import { Router } from "express";
import {z} from 'zod'
import { UserModel , ContentModel, ShareableModel } from './db';
import jwt from "jsonwebtoken";
import { Middleware } from "./middleware";
import { random } from "./utils";
const userRouter= Router();

userRouter.post('/signup',async (req:any, res) => {
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

   res.status(200).json({msg:"Signed in successfully"});
}
catch(error){
   res.status(500).json({msg:"Server Error"})
}
})

userRouter.post('/content',Middleware,async(req:any,res)=>{
    const {link,title,type}  = req.body;
    await ContentModel.create({
        link,
        title,
        type,
        tags:[],
        user:req._id
    })
    res.json({msg: "Content creation is done"});
})
userRouter.get('/content',Middleware,async(req:any,res)=>{
     const user=req._id;
     const content = await ContentModel.find({user:user});
     res.json(content)
})
userRouter.delete('/content',Middleware,async(req:any,res)=>{
     const contentId = req.body.contentId;

     await ContentModel.deleteMany({
        contentId,
        user: req._id
    })

    res.json({
        message: "Deleted"
    })

})

userRouter.post('/brain/share',Middleware,async(req:any,res)=>{
        const share = req.body.share;
        if(share){
            await ShareableModel.create({
                hash: random(10),
                user:req._id
            })
        }
        else{
            await ShareableModel.deleteOne({
                user: req._id
            })
        }
        res.json({
            msg:"Updated Shareable link"
        })
})

userRouter.get('/brain/:share',async(req:any,res)=>{
     const hash =req.params.share;

     const link = await ShareableModel.findOne({
        hash:hash
     })
     if(!link){
        res.status(404).json({msg:"Link not found"})
        return;
     }
     const content = await ContentModel.findOne({
        user:link.user
     })
     if(!content){
        res.status(404).json({msg:"Content not found"})
        return;
     }
     const user = await UserModel.findOne({
        _id:link.user
     })

     res.json({
        username:user?.username,
        content: content 
     }); 
})

export { userRouter };

