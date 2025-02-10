import messageModel from "../../DB/model/message.model.js";
import userModel from "../../DB/model/User.model.js";
import {asyncHandler} from "../../utils/error/error.js"
import { succesResponse } from "../../utils/response/succes.response.js";

export const sendMessage=asyncHandler(async(req,res,next)=>{
const{message,receiverId}=req.body
if(!await userModel.findOne({_id:receiverId,isDeleted:false})){
return next(new Error(" user not found",{cause:404}))
}
const createMessage= await messageModel.create({message,receiverId})
return succesResponse({res,message:"Done",status:201,data:{createMessage}})
})


export const deleteMessage=asyncHandler(async(req,res,next)=>{
const{messageId}=req.params
if(!await messageModel.findByIdAndDelete(messageId)){
    return next(new Error("message is not found"))
}
return succesResponse({res,message:"message deleted successfully"})


})