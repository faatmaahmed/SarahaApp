import mongoose  from "mongoose";
import { model,Schema } from "mongoose";
import { roleTypes } from "../../midedleware/auth.middleware.js";





const userSchema=new Schema({
    userName:{type:String,required:true,minlength:2,maxlength:30},
    email:{type:String,unique:true,required:true},
    confirmEmailOtp:String,
    password:{type:String,required:true},
    phone:String,
    gender:{type:String,enum:['male','female'],default:'female'},
    image:String,
    confirmEmail:{type:Boolean,default:false},
    role:{type:String,
        default:roleTypes.user
        ,enum:Object.values(roleTypes)},
    changePasswordTime:Date    ,
    isDeleted:{type:Boolean,default:false},
    activationCode:String,
    forgetPasswordCode:String,
    reactivateCode:String,
    updateEmailCode: String


},{timestamps:true})
const userModel=mongoose.models.User||model('User',userSchema)
export default userModel 