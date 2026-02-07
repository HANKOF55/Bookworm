// core modules
import { request } from "express";
import jwt from "jsonwebtoken";

// Function for validating JWT token
export const jwtAuthMiddleware = (req, res, next) => {

    // check request header has authorization or not (Express normalizes headers to lowercase)
    const authorization = req.headers.authorization || req.headers.Authorization;

    if (!authorization) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token."
        })
    }

    // Extract jwt token from header - handle both "Bearer <token>" and just "<token>" formats
    let token;
    if (authorization.startsWith("Bearer ")) {
        token = authorization.split(" ")[1];
    } else {
        // If no Bearer prefix, assume the entire value is the token
        token = authorization;
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    try {

        // Verify the JWT token and get the payload 
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Attatch payload to request object with key name
        req.payloadData = decode;
        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        })
    }

}

// Function for generating JWT Token
export const generateToken = (userData) => {
    // Generating a new JWT token using user data directly (not wrapped)
    // Yes, setting { expiresIn: "8h" } will make the JWT valid for 8 hours.
    return jwt.sign(userData, process.env.JWT_SECRET);
}

// Function for generating JWT Rfresh Token
export const generateRefreshToken = (payload) => {
    // Use the refresh token secret defined in .env
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    });
};



