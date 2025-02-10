import mongoose, { Schema, Types,model } from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    borrowedBooks:{type:mongoose.Schema.Types.ObjectId,ref:'Book'}
})
const bookSchema=new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    publishedYear:{type:Number,required:true},
    genre:{type:String,required:true},
    availableCopies:{type:Number,required:true}
})

const librarySchema=new mongoose.Schema({
    name:{type:String,required:true},
    location:{type:String,required:true},
    books:{type:mongoose.Schema.Types.ObjectId,ref:'Book'}

})
const borrowBookSchema=new mongoose.Schema({

    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    bookId:{type:mongoose.Schema.Types.ObjectId,ref:'Book',required:true},
    borrowedAt:{type:Date,default:Date.now,required:true},
    dueDate:{type:Date,required:true},
    returned:{type:Boolean,default:false}
})


const User= mongoose.model("User",UserSchema)
const Book=mongoose.model('Book',bookSchema)
const Library=mongoose.model('Library',librarySchema)
const BorrowedBook=mongoose.model('BorrowedBook',borrowBookSchema)


module.exports={User,Book,Library,BorrowedBook}
