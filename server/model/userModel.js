import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
    },
    isVerifiled:{
        type:Boolean,
        default:false
    },
    isGoogle:{
        type:Boolean,
        default:false
    },
})


const userModel = mongoose.model('userModel',userSchema)
export default userModel