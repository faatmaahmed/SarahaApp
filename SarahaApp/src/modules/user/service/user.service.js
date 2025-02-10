import userModel from "../../../DB/model/User.model.js";
import messageModel from "../../../DB/model/message.model.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { generatRandomCodes } from "../../../utils/randomCodes.js"
import { succesResponse } from "../../../utils/response/succes.response.js";
import { generateDncryption } from "../../../utils/security/encryption.js";
import { compareHash ,generateHash} from "../../../utils/security/hash.js";


export const Profile=asyncHandler(async(req,res,next)=>{ 
  req.user.phone=generateDncryption({cipherText:req.user.phone})
const message= await messageModel.find({receiverId:req.user._id}).populate([{path:'receiverId' ,select: 'userName -_id'}])

  return succesResponse ({res,message:"Done",data:{user:req.user,message},status:200})
})

export const shareProfile=asyncHandler(async(req,res,next)=>{ 
const user=await userModel.findOne({_id:req.params.userId,isDeleted:false}).select("userName email image")
  return user ? succesResponse ({res,message:"Done",data:{user}}):next(new Error("in-valid account id",{cause:404}))
})


export const updateProfile=asyncHandler(
  async(req,res,next)=>{ 
const user = await userModel.findByIdAndUpdate(req.user._id,req.body,{new:true,runValidators:true})
  return succesResponse ({res,message:"Done",data:{user},status:200})
})

export const updatePassword=asyncHandler(
  async(req,res,next)=>{ 
  const{oldpassword,password}=req.body
  if (!compareHash({plaintext:oldpassword,hashValue:req.user.password}))
  {
    return next (new Error("in-valid old password",{cause:409}))
  }
  const hashPassword=generateHash({plaintext:password})
  const user = await userModel.findByIdAndUpdate(req.user._id,{password:hashPassword,changePasswordTime:Date.now()},{new:true,runValidators:true})
    return succesResponse ({res,message:"Done",data:{user}})
  })



  export const freezProfile=asyncHandler(
    async(req,res,next)=>{ 
    
    const user = await userModel.findByIdAndUpdate(req.user._id,{isDeleted:true,changePasswordTime:Date.now()},{new:true,runValidators:true})
      return succesResponse ({res,message:"Done",data:{user},status:200})
    })

