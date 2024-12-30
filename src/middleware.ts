import jwt from 'jsonwebtoken'

const userkey = process.env.USERKEY

function Middleware(req : any,res:any,next:any){
    const token = req.headers('Authorization')
    if(!token) {
        return;
    }

}