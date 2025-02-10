import userModel from "../../../DB/model/User.model.js";
import { roleTypes } from "../../../midedleware/auth.middleware.js";
import {asyncHandler} from "../../../utils/error/error.js"
import { succesResponse } from "../../../utils/response/succes.response.js";
import { compareHash } from "../../../utils/security/hash.js";
import { generateToken} from "../../../utils/security/token.js";


export const login =asyncHandler(async(req, res, next) => {
  
   const{email,password}=req.body
   const user =await userModel.findOne({email})
   if (!user)
   {
   return next(new Error("In-valid Account",{cause:404}))
   }
   if (!compareHash({plaintext:password,hashValue:user.password}))
   {
   return next(new Error("In-valid Account",{cause:404}))
   }
  const token= generateToken({payload:{_id:user._id,isLoggedIn:true,role:user.role},
   signture:user.role==roleTypes.admin?process.env.TOKEN_SIIGNATURE_ADMIN:process.env.TOKEN_SIIGNATURE,
   Options:{expiresIn:3600}})
   if (user.isDeleted) {
      user.isDeleted=false
      await user.save()
   }

   return succesResponse({res,message:"Done",data:{token}})
}
)

