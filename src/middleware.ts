import jwt from 'jsonwebtoken'
import { string } from 'zod';

function Middleware(req : any,res:any,next:any){
    const token = req.headers['Authorization']
    if(!token) {
        return;
    }
  const decode= jwt.verify(token as string,'Random323903Numbersrasalesliceses');
  
  req._id = (decode as { _id: string })._id;

  next();

}

export {Middleware}