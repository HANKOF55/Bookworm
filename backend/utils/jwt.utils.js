// core modules
import { request } from "express";
import jwt from "jsonwebtoken";

// Function for validating JWT token
export const jwtAuthMiddleware = (req, res, next) => {

    // check request header has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization) {
        return res.status(401).json({
            success: false, 
            message: "Invalid Token."
        })
    }

    // Extract jwt token from header and split "Bearar JwtToken" bearar from token
    const token = authorization.split(" ")[1];

    if(!token) {
        return res.status(401).json({
            success: false, 
            message: "Unauthorized"
        })
    }

    try{

        // Verify the JWT token and get the payload 
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Attatch payload to request object with key name
        req.payloadData = decode;
        next();

    } catch(err) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        })
    }

}

// Function for generating JWT Token
export const generateToken = (userData) => {

    // Generating a new JWT token using user data
    return jwt.sign({userData}, process.env.JWT_SECRET, {expiresIn:"60m"});
}

// Function for generating JWT Rfresh Token
export const generateRefreshToken = (payload) => {

    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d"
    });
  };



