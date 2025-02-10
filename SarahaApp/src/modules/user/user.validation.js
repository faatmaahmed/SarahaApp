import joi from 'joi'
import { generalFields } from '../../midedleware/validation.middelware.js'


export const shareProfile=joi.object().keys({
    userId:generalFields.id.required()
}).required()

export const udateprofile=joi.object().keys({
    userName:generalFields.userName,
    phone:generalFields.phone,
    DOB:joi.date().less("now")
}).required()


export const udatepassword=joi.object().keys({
    oldpassword:generalFields.password.required(),
    password:generalFields.password.not(joi.ref("oldpassword")).required(),
    confirmationPassword:generalFields.confirmationPassword.valid(joi.ref("password")).required()


}).required()


export const updateEmail=joi.object().keys({
    newEmail:generalFields.email.required()
    }).required()
    
    
    export const newEmail=joi.object().keys({
    code:joi.string().required()
    }).required()