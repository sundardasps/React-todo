import axios from 'axios'

const userApi = axios.create({
    baseURL:'http://localhost:5000'
})


export async function login(values){
    try {
       const result = await userApi.post('/login',values)
       return result
    } catch (error) {
       console.log(error.message); 
    }
}

export async function signup(values){
    try {
       const result = await userApi.post('/signup',values)
       return result
    } catch (error) {
       console.log(error.message); 
    }
}

export async function googleSignUp(values){
   try {
      const result = await userApi.post('/googleSignUp',values)
      return result
   } catch (error) {
      console.log(error.message); 
   }
}

export async function otpVerification(otp,email){
   try {
      const result = await userApi.get(`/otpVarify/${otp}/${email}`)
      return result
   } catch (error) {
      console.log(error.message); 
   }
}

export async function resendOtp(email){
   try {
      const result = await userApi.get(`/resendOtp/${email}`)
      return result
   } catch (error) {
      console.log(error.message); 
   }
}