import jwt from 'jsonwebtoken'
export function tokenJwt(exist) {

    const token = jwt.sign( {userId:exist._id} , process.env.jwtSecretKey, {
      expiresIn: "30d",
    });
    return token;
  }