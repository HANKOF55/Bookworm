// core modules
import User from "../models/user.model.js";
import bcrypt from "bcrypt";


// local modules
import { generateToken } from "../middlewares/jwt.middleware.js";


// User Controllers

export const registerUser = async (req, res) => {
    try{

        const { name, email, password, role, avatar, createdAt, updatedAt } = req.body;

        // check if any field is empty
        if(!name || !email || !password || !role || !avatar || !createdAt || !updatedAt){
            return res.status(400).json({
                success: false, 
                message: "All fields are required to filled."
            })
        }

        // checking if user already exist
        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(409).json({
                success: false, 
                message: "User already exist."
            })
        }  

        const emailNormalized = email.toLowerCase();

        if(password.length != 8 ){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long."
            })
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({name, email: emailNormalized, password: hashedPassword, role, createdAt, updatedAt})

        // jwt payload
        const payload = {
            id: newUser._id,
            email: newUser.email
        }

        // generate new jwtToken
        const token = generateToken(payload);

        return res.status(201).json({
            user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role, 
            avatar: newUser.avatar, 
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
            },
            token
        })


    } catch(err) {
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error."
        })
    }
}

export const loginUser = async(req, res) => {
    try{

        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false, 
                message: "Please fill the required fields."
            })
        }

        const emailNormalized = email.toLowerCase();

        const user = await User.findOne({emailNormalized});

        if(!user || !(await bcrypt.compare(password))) { 
            return res.status(404).json({
                success: false, 
                message: "Invalid username or password."
            })
        }

        const payload = {
            id: user._id,
            email: user.email
        }

        const token = generateToken(payload);

        return res.status(200).json({
            success: true, 
            token
        })


    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
}

export const logOutUser = async(req, res) => {
    res.send("logout");
}

// User Authenticated Controllers

export const getUserProfile = async(req, res) => {
    try{
        const payload = req.payloadData;

        const userId = payload.id;

        const user = await User.findOne(userId);

        if(!user) {
            return res.status(404).json({
                success: false,
                error: {
                    message: "User not found in our records.",
                    code: "User_Not_Found.",
                }
            })
        }

        return res.status(200).json({
            success:true,
            user: user
        })
        

    } catch(err){
        return res.status(500).json({
            success: false,
            error: {
                message: "Something went wrong on our end",
                code: "Internal_Server_Error."
            }
        })
    }
}

export const patchUser = async(req, res) => {
    res.send("Update User");
}

// Admin Controllers

export const getUser = async(req, res) => {
    res.send("get user here");
}

export const getUserById = async(req, res) => {
    res.send("get user by Id");
}

export const deleteUser = async(req, res) => {
    res.send("delete User Here");
}

