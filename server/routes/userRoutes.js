import express from "express";
import userDb from '../model/userModel.js'
import { userSignUp ,userVarification,resendOTP,userLogin, googleRegister} from "../controllers/authController.js";
const userRoutes = express()

userRoutes.post('/login',userLogin)
userRoutes.post('/signup',userSignUp)
userRoutes.post('/googleSignUp',googleRegister)


userRoutes.get('/otpVarify/:otp/:email',userVarification)
userRoutes.get('/resendOtp/:email',resendOTP)
    


export default userRoutes 