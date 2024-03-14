import passwordHasher from '../helpers/hasher.js';
import userDb from '../model/userModel.js'
import mailer from '../helpers/nodeMailer.js'
import { tokenJwt } from '../helpers/jwt.js';
import bcrypt from 'bcrypt'
//------------------------------------------------User Signin-------------------------------------------//

export const userSignUp = async (req, res) => {
    try {
      const { userName, password, email } = req.body;
      const exist = await userDb.findOne({ email: email });
      const hashedpass = await passwordHasher(password);
  
      if (exist) { 
        return res
          .status(200)
          .json({ message: "The email you provided is already registered." });
      } else {
        const randomNum = Math.floor(10000 + Math.random() * 90000)
        const user = new userDb({
          userName,
          email,
          password: hashedpass,
          otp:randomNum
        });
        if (user) {
          const userData = await user.save().then(console.log("user registered"));
          mailer(email, "Varification mail", userData.otp);
          return res.status(200).json({
            created: true,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  //------------------------------------------User login----------------------------------------//

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await userDb.findOne({ email: email });
    if (exist){
      const passMatch = await bcrypt.compare(password, exist.password);
      if (passMatch) {
        if (exist.isVerifiled || exist.isGoogle) {
          const jwtToken = tokenJwt(exist);
          if (jwtToken) {
            console.log(email,password,"kkk");
            return res.status(200).json({
              loginData: exist,
              loginSuccess: true,
              message: "Login Successfully",
              jwtToken,
            });
          }
        } else {
          mailer(email, "Varification mail", userData.otp);
          return res.status(200).json({
            created: true,
            message:
              "Your account is not verified; an OTP has been sent to your email.",
          });
        }
      } else {
        res.json({
          message: "The password you entered is incorrect.",
        });
      }
    

    } else {
      res.json({ message: "The entered email addresses do not match." });
    }
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------Email Varification----------------------------------------//

export const userVarification = async (req, res) => {
  try {
    const { email,otp } = req.params;
    const varified = await userDb.findOne({ email: email });
    if (varified) {
      if (varified.otp === otp){
        await userDb.findOneAndUpdate(
          { email: email },
          { $set: { isVerifiled: true ,otp:""} }
        );
        return res
          .status(200)
          .json({ loginSuccess: true, message: "Login successfully" });
      } else {
        return res.json({
          loginSuccess: false,
          message: "Invalid OTP.",
        });
      }
    } else {
      return res.json({
        loginSuccess: false,
        message: "The entered email addresses do not match.",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------Resend OTP----------------------------------------//

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.params;
    const varified = await userDb.findOne({ email: email });
    if (varified) {
      const randomNum = Math.floor(10000 + Math.random() * 90000)
      const varified = await userDb.findOneAndUpdate({ email: email },{$set:{otp:randomNum}});
       if(varified){
        mailer(email, "Varification mail", randomNum);
          return res.status(200).json({
            loginSuccess: true,
          });
       }
    } else {
      return res.json({
        loginSuccess: false,
        message: "The entered email addresses do not match.",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//------------------------------------------User googleregistration----------------------------------------//


export const googleRegister = async (req, res) => {
  try {
    const { email, id, name, } = req.body;
    console.log(email, id, name,"kkkkkkkkkk");

    const exist = await userDb.findOne({ email: email });
    if (exist) {
      return res.json({
        message: "The email you provided is already registered.",
      });
    } else {
      const hashedpass = await passwordHasher(id);
      const googleUser = new userDb({
        userName: name,
        email,
        password: hashedpass,
        isGoogle:true,
        isVerifiled: true,
      });
      const userData = await googleUser
        .save()
        .then(console.log("user registered"));

      if (userData) {
        const jwtToken = tokenJwt(userData);

        if (jwtToken) {
          return res.status(200).json({
            created: true,
            message: "Google registration successfull",
            jwtToken,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};