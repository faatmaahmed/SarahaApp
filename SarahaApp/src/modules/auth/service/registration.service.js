import userModel from "../../../DB/model/User.model.js";
import { emailEvent ,emailEventOtp} from "../../../utils/events/email.event.js"
import {asyncHandler} from "../../../utils/error/error.js"
import { succesResponse } from "../../../utils/response/succes.response.js";
import {  generateHash ,compareHash} from "../../../utils/security/hash.js";
import { generateEncryption } from "../../../utils/security/encryption.js";
import {  verifyToken } from "../../../utils/security/token.js";
import { generatRandomCodes } from "../../../utils/randomCodes.js"

export const signup = asyncHandler(async(req, res, next) => {
const{userName,email,password,confirmationPassword,phone}=req.body

if(password!=confirmationPassword){
      return next(new Error("password!=confirmPassword",{cause:400}))
   }
   if(await userModel.findOne({email})){
   return next(new Error("Email exists",{cause:409}))
   }
   const hashPassword=generateHash({plaintext:password,salt:10})
   const encryptPhone=generateEncryption({plaintext:phone,})
   const user =await userModel.create({userName,email,password:hashPassword,phone:encryptPhone})
   emailEvent.emit("sendConfirmEmail",{email})
   return succesResponse({res,message:"Done",data:{user},status:201})

   
})

export const signUpOtp=asyncHandler(async(req,res,next)=>{
   const{userName,email,password,phone}=req.body
   if(await userModel.findOne({email})){ 
   return next(new Error("email is already exist ",{cause:409}))
   }
   const hashPassword= generateHash({plaintext:password})
   const user= await userModel.create({userName,email,password:hashPassword})
   emailEventOtp.emit("sendActivationCode",{email})
   return succesResponse({res,status:201,message:"plesae check your email"})  
       })

       
export const confirmEmail = asyncHandler(async(req, res, next) => {
  
   const{authorization}=req.headers;
   const decoded=verifyToken({token:authorization,signature:process.env.EMAIL_TOKEN_SIGNATURE})
   const user=await userModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true},{new:true})
   return succesResponse({res,message:"Done",data:{user},status:201})

})

export const confirmEmailOtp=asyncHandler(async(req,res,next)=>{
   const{email,code}=req.body
   const user= await userModel.findOne({email})
   if(!user){ 
   return next(new Error("in-valid-account ",{cause:404}))
   }

   if(user.confirmEmail){ 
      return next(new Error("already verified ",{cause:409}))
      }
      if(!compareHash({plaintext:code,hashValue:user.confirmEmailOtp})){ 
         return next(new Error("in-valid code ",{cause:400}))
         }
    await userModel.updateOne({email},{confirmEmail:true,$unset:{confirmEmailOtp:0}})
   return succesResponse({res,status:200,message:"Done"}) 
   })
