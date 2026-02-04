import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { generateRefreshToken } from "../utils/jwt.utils.js";
import { networkInterfaces } from "os";


export const refreshAccessToken  = async(req, res) => {
    
    try{

        const refreshToken = req.cookies.refreshToken;
        
        if(!refreshToken){
            return res.status(401).json({
                success: false,
                error: {
                    message: "Refresh token missing."
                }
            })
        }

        const decoded = jwt.verify(
            refreshAccessToken, 
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decoded.id);

        if(!user || user.refreshToken !== refreshAccessToken){
            return res.status(401).json({
                success: false, 
                error: {
                    message: "Invalid refresh token."
                }
            })
        }

        const newRefreshToken = generateRefreshToken(
            {
                id: user._id,
                role: user.role
            }
        );

        return res.status(200).json({
            success: true,
            accessToken: newRefreshToken
        })


    } catch(err) {
        return res.status(401).json({
            success: false,
            error: {
                message: "Invalid or expired refresh token.",
                code: "INVALID_TOKEN"
            }
        })
    }

}