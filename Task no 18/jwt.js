import dotenv from 'dotenv'
import User from '../model/userSchema.js'
import jwt from 'jsonwebtoken'
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

export const generateToken = async (userId) =>{
    const token = jwt.sign(
        {userId : userId},
        JWT_SECRET,
        {expiresIn: '1h'}
    );
    return token
}
export const verifyToken = async(token)=>{
    const decode = jwt.verify(token , JWT_SECRET)
    const user = await User.find({_id:decode?.userId})
    return user
}