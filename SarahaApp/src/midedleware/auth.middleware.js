
import userModel from "../DB/model/User.model.js";
import { asyncHandler } from '../utils/error/error.js';
import { verifyToken } from '../utils/security/token.js';


export const roleTypes={
    user:'User',
    admin:'admin',
    hr:'hr'
}

console.log(Object.values(roleTypes));


export const authentication=()=>{
    return asyncHandler(async(req,res,next)=>{
    const {authorization}=req.headers
    const [Bearer,token]=authorization?.split(" ") || []
    
    
    if(!Bearer || !token){
    return next(new Error("in valid token component",{cause:400}))
        }
    let signature=undefined
    switch (Bearer) {
        case "admin":
         
        signature=process.env.TOKEN_SIIGNATURE_ADMIN
        
     break;
     case "Bearer":
        signature=process.env.TOKEN_SIIGNATURE
     break;
        default:
    break;
     }
     
     const decoded =verifyToken({token,signature})
     if(!decoded?._id){
     return next(new Error("in valid token payload",{cause:400}))
     } 
     const user= await userModel.findById(decoded._id)
     if(!user){
     return next(new Error("user not found",{cause:404}))
     } 
     if (user.changeCredintialTime?.getTime() >= decoded.iat * 1000){  
     return next(new Error("in valid credintials",{cause:400}))
     } 
     req.user=user
     return next()
     })  
     
     }
    
    
    
    export const authorization=(accessRoles=[])=>{
    return  asyncHandler(async(req,res,next)=>{

    if(!accessRoles.includes(req.user.role)){

    return next(new Error("you are not authorized",{cause:403}))

    }
     return next()
     } )
     }
    
    
