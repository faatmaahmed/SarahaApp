import joi from 'joi'
import { Types } from 'mongoose'

export const validateObjectId=(value,helper)=>{
    console.log({value,helper});
    
    return Types.ObjectId.isValid(value)
    ?true
    :helper.message("in-valid objectId")
}

export const generalFields={   
    userName:joi.string().pattern(new RegExp(/^[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{1,20}$/)).min(2).max(50),
    email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 3, tlds: { allow: ['com', 'net', 'edu', 'eg'] } }),
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        confirmationPassword:joi.string().valid(joi.ref("password")),
        phone:joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)),
        id:joi.string().custom(validateObjectId),
        code:joi.string().pattern(new RegExp(/^\d{4}$/)),
        'accept-language':joi.string().valid("en","ar")

}



export const validation=(schema,)=>{

return (req,res,next)=>{



const inputData= {...req.body,...req.query,...req.params}
console.log({inputData});
if (req.headers['accept-language']) {
    inputData['accept-language']=req.headers['accept-language']
}
console.log(inputData);


const validationResult=schema.validate(inputData,{abortEarly:false })
if (validationResult.error) {
return res.status(400).json({message:"validation error",validationResult:validationResult.error.details})
   
}
return next( )
}

}
