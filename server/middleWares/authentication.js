import jwt from "jsonwebtoken";
import userDb from "../model/userModel.js";
import dotenv from "dotenv";
dotenv.config();


const authentication = async (req, res, next) => {
  try {
      if (req.headers.authorization) {
          const token = req.headers.authorization.split(" ")[1];
          const decode = jwt.verify(token, process.env.jwtSecretKey);
          const exist = await userDb.findOne({ _id: decode.userId });
          if (exist) {
          req.headers.userId = decode.userId;
          next();
      } else {
        return res.json({ message: "user not authorised or inavid user" });
      }
    } else {
      return res.json({ message: "user not authorized" });
    }
  } catch (error) {}
};

export default authentication