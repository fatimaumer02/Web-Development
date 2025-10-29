import bcrypt from "bcrypt";
import User from "../model/userSchema.js";
import { generateToken  } from "../helper/jwt.js";
import dotenv from "dotenv";
dotenv.config();


export const createUser = async (req, res)=>{
    try{
        let {name, email , password} = req.body; // const instead of let
        const  checkUser = await User.findOne({email});
        if (checkUser){
            return res.json({message: "user already exists"});
        }
        //hash the password
        const salt = await bcrypt.genSalt(10); // not use
        const hashpassword = await bcrypt.hash(password,salt) //salt instead of 10 
        const newUser = await User.create({
            name :name,
            email : email,
            password : hashpassword
        })
        res.json({message : "user created successfully", newUser});
        console.log(newUser);

}
catch(err){
    res.json({message : err.message});
}
}


export const loginUser = async(req,res)=>{
try{
    const {email } = req.body;
    const user = await User.find({email});
    if (!user){
        return res.status(400).json({message:"user not exists"})
    }
    const token = await generateToken(user._id)
    if (token){
        res.json({token})
    }else{
        res.json('Register yourself')
    }
    //  Compare entered password with hashed password bcz in db password is hashed
    // const match = await bcrypt.compare(password , user.password);
    // if(!match){
    //     return res.status(400).json({message: "invalid credentials"})
    // } this code use when i add the password in first line
   
    // res.status(201).json({message: "login successful"})
    // console.log(token)
}
catch(err){
 res.json({message: err.message})
}
}

 const getUser = async (req , res)=>{
    try{
    const data = await User.find(id)
    res.json({data})
 }catch(err){
    res.json(err)
 }
}
export default getUser;