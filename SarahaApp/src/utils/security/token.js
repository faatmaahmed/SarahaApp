import jwt from "jsonwebtoken";

export const generateToken=({payload={},signture=process.env.TOKEN_SIIGNATURE,options={}}={})=>{
    const token=jwt.sign(payload,signture,options)
    return token

}



export const verifyToken=({token="",signture=process.env.TOKEN_SIIGNATURE}={})=>{
    const verify= jwt.verify(token,signture)
    return verify

}
