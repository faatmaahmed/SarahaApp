import  joi from 'joi'
import { generalFields } from '../../midedleware/validation.middelware.js'

export const signup= joi.object({
        userName:generalFields.userName.required(),
        email:generalFields.email.required(),
        password:generalFields.password.required(),
        confirmationPassword:generalFields.confirmationPassword.valid(joi.ref("password")).required(),
        phone:generalFields.phone,
     }).required().options({allowUnknown:false})

     export const signUpOtp= joi.object({
      userName:generalFields.userName.required(),
      email:generalFields.email.required(),
      password:generalFields.password.required(),
      confirmationPassword:generalFields.confirmationPassword.valid(joi.ref("password")).required(),
      phone:generalFields.phone,
   }).required().options({allowUnknown:false})



     export const login= joi.object().keys({

      email:generalFields.email.required(),
      password:generalFields.password.required(),
   }).required().options({allowUnknown:false})
  



   export const confirmEmailOtp=joi.object().keys({
      email:generalFields.email.required(),
      code:generalFields.code.required()
      }).required()


export const signup_custom={
   body: joi.object({
        userName:joi.string().pattern(new RegExp(/^[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{1,20}$/)).min(2).max(50).required(),
        email:joi.string().pattern(new RegExp(/^[a-zA-Z]{1,}\d{0,}[a-zA-Z0-9]{1,}[@][a-z]{1,}(\.com|\.edu|\.net){1,3}$/)).email({minDomainSegments:2,maxDomainSegments:3,tlds:{allow:['com','net','edu','eg']}}).required(),
        password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        confirmationPassword:joi.string().valid(joi.ref("password")).required(),
        phone:joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)),
     }).required().options({allowUnknown:false}),
     params: joi.object().keys(
       {
       id:joi.boolean().required()
    }).required().options({allowUnknown:false}),
    headers: joi.object().keys(
        {
        'accept-language':joi.string().valid("en","ar")
     }).required().options({allowUnknown:true})
}
   
 