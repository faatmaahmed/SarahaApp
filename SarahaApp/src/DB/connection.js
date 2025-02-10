import mongoose from "mongoose";

const connectDB=async()=>{
   await mongoose.connect(process.env.DB_URI).then(res=>{
console.log(`DB connected`);

    }).catch(err=>{
        console.error(`Fail to connected DB`,err);

        
    })
}
export default connectDB