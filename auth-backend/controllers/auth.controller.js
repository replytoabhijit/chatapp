import userModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import generateJWTTokenAndSetCookie from '../utils/generateToken.js';

const signup = async (req, res) => {
    try {
        const { username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const foundUser = await userModel.findOne({ username});
        if(foundUser){
            res.status(201).json({ message: "Username already exists. Please choose a different username." });
        } else{
            const user = new userModel({
                username,
                password: hashedPassword
            });
            generateJWTTokenAndSetCookie(user._id, res);
            await user.save();
            res.status(201).json({ message: "User created successfully!" });
 
        }


    } catch (error){
        console.log("Error in signup controller: ", error);
        res.status(500).json({ message: "User Reg failed due to internal error" });
    }

}

export const login = async (req, res) => {
    try {
        const { username, password} = req.body;
        
        const foundUser = await userModel.findOne({ username});
        if(!foundUser){
            res.status(401).json({ message: "Auth failed - User Not found" });
        } else{
            const passwordMatch = await bcrypt.compare(password, foundUser?.password);
            if(!passwordMatch){
                res.status(401).json({ message: "Auth failed - Wrong Password" });
            } else{
                generateJWTTokenAndSetCookie(foundUser._id, res);
                res.status(201).json({ _id: foundUser._id, username: foundUser.username });
            }         
        }

    } catch (error){
        console.log("Error in Login controller: ", error);
        res.status(500).json({ message: "User Login failed due to internal error" });
    }

}

export default signup;