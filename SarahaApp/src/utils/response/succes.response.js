export const succesResponse=({res,message="done",data={},status=200}={})=>{
return res.status(status).json({message:message,data:{...data}})
}