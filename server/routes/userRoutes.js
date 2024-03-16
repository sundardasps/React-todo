import express from "express";
import userDb from '../model/userModel.js'
import { userSignUp ,userVarification,resendOTP,userLogin, googleRegister} from "../controllers/authController.js";
import { createTodo,deleteTodo,editTodo,getTodoDetails,getTodoList } from "../controllers/userController.js";
import authentication from "../middleWares/authentication.js";
const userRoutes = express()
userRoutes.post('/login',userLogin)
userRoutes.post('/signup',userSignUp)
userRoutes.post('/googleSignUp',googleRegister)
userRoutes.get('/resendOtp/:email',resendOTP)
userRoutes.get('/otpVarify/:otp/:email',userVarification)


userRoutes.post('/createTodo',authentication,createTodo)
userRoutes.get('/todoList',authentication,getTodoList)
userRoutes.get('/getTodo/:todoId',authentication,getTodoDetails)
userRoutes.get('/deleteTodo/:todoId',authentication,deleteTodo)
userRoutes.put('/editTodo',authentication,editTodo)
    


export default userRoutes 