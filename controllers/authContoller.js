import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*signup method*/
export const singup= async (req, res)=>{
     try{
        const{name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are necessary"});
        }

        const hashedPassword= await bcrypt.hash(password, 10); 
        const newUser = new User({name, email, password: hashedPassword});
        const result = await newUser.save();
        return res.status(201).json(result);
     }
     catch(error){
        return res.status(500).json({error: error.message})
     }
}

/*login method*/
export const login= async(req, res)=>{
    try{
       const{email, password} = req.body;
       if(!email || !password){
           return res.status(400).json({message: "All fields are necessary"});
       }
       const existingUser = await User.findOne({email});
       if(!existingUser){
          return res.status(400).json({message: "User does not exist"});
       }
       const matchPassword = await bcrypt.compare(password, existingUser.password);
       if(!matchPassword){
           return res.status(400).json({msg: "Invalid credentials"})
       }
       const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET);
       const { password: _p, ...safeUser } = existingUser.toObject();
       return res.status(200).json({token, user: safeUser})

    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
}