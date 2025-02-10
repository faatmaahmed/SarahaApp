import { customAlphabet } from "nanoid";
import { EventEmitter } from "node:events";
import {confirmEmailTemplate,sendCodeTemp} from "../email/template/confirmEmail.js"
import { sendEmail } from "../email/sendEmails.js";
import { generateToken } from "../security/token.js";
import { generateHash } from "../security/hash.js";
import userModel from "../../DB/model/User.model.js";



export const emailEvent= new EventEmitter()
emailEvent.on("sendConfirmEmail",async({email}={})=>{
    const emailToken =generateToken({payload:{email},signature:process.env.TOKEN_SIIGNATURE})
    
    const emailLink=`${process.env.FE_URL}/confirm-email/${emailToken}`
    const html=confirmEmailTemplate({link:emailLink})
    await sendEmail({to:email,subject:"confirmEmail",html})
})

export const emailEventOtp= new EventEmitter
emailEventOtp.on("sendActivationCode",async({email}={})=>{
    const otp=customAlphabet("0123456789",4)()
    const hashOtp=generateHash({plaintext:otp})
    await userModel.updateOne({email},{confirmEmailOtp:hashOtp})
    const html=sendCodeTemp({code:otp})
    await sendEmail({to:email,subject:"confirm-email",html})
    
})

