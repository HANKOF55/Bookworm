// core modules
import User from "../models/user.model.js";
import bcrypt from "bcrypt";


// local modules
import { generateToken, generateRefreshToken } from "../utils/jwt.utils.js";
import mongoose from "mongoose";


// User Controllers

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const emailNormalized = email.toLowerCase();

        const existingUser = await User.findOne({ email: emailNormalized });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email: emailNormalized,
            password: hashedPassword,
            role: "user"
        });

        const token = generateToken({
            id: newUser._id,
            email: newUser.email
        });

        return res.status(201).json({
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                createdAt: newUser.createdAt
            },
            token
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill the required fields."
            });
        }

        const emailNormalized = email.toLowerCase();

        // Explicitly select password so password is present for comparison,
        // select name and role to send to client, exclude __v and other unnecessary fields.
        const user = await User.findOne({ email: emailNormalized }).select("+password name role email");

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password."
            });
        }

        const payload = {
            id: user._id,
            email: user.email
        }

        const token = generateToken(payload);
        // const refreshToken = generateRefreshToken(payload);


        // // Store refresh token in DB for this user
        // user.refreshToken = refreshToken;
        // await user.save();

        // // send refresh token as HTTP-only cookie
        // res.cookie("refreshToken", refreshToken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "strict",
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // });

        return res.status(200).json({
            success: true,
            token,
            user: {
                name: user.name,
                role: user.role
            }
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
}

export const getMe = async (req, res) => {
    try {
        // Check if payloadData exists and has an id
        const payload = req.payloadData;
        if (!payload || !payload.id) {
            return res.status(401).json({
                success: false,
                error: {
                    message: "Invalid or missing authorization payload.",
                    code: "INVALID_TOKEN_PAYLOAD"
                }
            });
        }

        const userId = payload.id;

        // Validate userId format (MongoDB ObjectId)
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                error: {
                    message: "Invalid user ID.",
                    code: "INVALID_USER_ID"
                }
            });
        }

        const user = await User.findById(userId).select("-refreshToken -password");

        if (!user) {
            return res.status(404).json({
                success: false,
                error: {
                    message: "User not found.",
                    code: "USER_NOT_FOUND"
                }
            });
        }

        // Make sure to send a plain object (not Mongoose model) if needed
        return res.status(200).json({
            success: true,
            data: user.toObject ? user.toObject() : user
        });

    } catch (err) {
        console.error("Error in getMe:", err);
        return res.status(500).json({
            success: false,
            error: {
                message: err.message || "Internal server error.",
                code: "INTERNAL_SERVER_ERROR"
            }
        });
    }
}

export const logOutUser = async (req, res) => {
    try {
        const userId = req.payloadData.id;

        await User.findByIdAndUpdate(userId, {
            refreshToken: null
        });

        res.clearCookie("refreshToken");

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                error: {
                    message: "Internal server error.",
                    code: "INTERNAL_SERVER_ERROR"
                }
            }
        );
    }
}

// User Authenticated Controllers

export const getUserProfile = async (req, res) => {
    try {
        const payload = req.payloadData;

        const userId = payload.id;

        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: {
                    message: "User not found in our records.",
                    code: "User_Not_Found.",
                }
            })
        }

        return res.status(200).json({
            success: true,
            data: user
        })


    } catch (err) {
        return res.status(500).json({
            success: false,
            error: {
                message: "Something went wrong on our end",
                code: "Internal_Server_Error."
            }
        })
    }
}

export const patchUser = async (req, res) => {
    try {

        const payload = req.payloadData;
        const userId = payload?.id ?? payload?.userData?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                error: {
                    message: "Invalid or missing authorization payload.",
                    code: "INVALID_PAYLOAD"
                }
            });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                error: {
                    message: "Invalid user ID.",
                    code: "INVALID_ID"
                }
            });
        }

        if ("role" in req.body) {
            return res.status(403).json({
                success: false,
                error: {
                    message: "You are not allowed to update role.",
                    code: "ROLE_UPDATE_FORBIDDEN"
                }
            })
        }

        // prevent empty updates
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                error: {
                    message: "No fields provided for update",
                    code: "EMPTY_UPDATE"
                }
            });
        }


        const allowedFields = ["name", "email", "password"];
        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        if (updates.email) {
            updates.email = updates.email.toLowerCase().trim();
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updates,
            { new: true, runValidators: true }
        )
            .select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                error: {
                    message: "User not found.",
                    code: "USER_NOT_FOUND"
                }
            });
        }

        return res.status(200).json({
            success: true,
            user: updatedUser
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: {
                message: "Internal Server error",
                code: "INTERNAL_SERVER_ERROR",
            }
        });
    }
}


// Admin Controllers

export const getAllUsers = async (req, res) => {

    try {
        const payload = req.payloadData;

        const user = await User.findOne({ _id: payload.id });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: {
                    message: "User not found.",
                    code: "RESOURCE_NOT_FOUND"
                }
            })
        }


        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                error: {
                    message: "You are not authorized to access this resource.",
                    code: "FORBIDDEN"
                }
            })
        }

        const allUsers = await User.find();

        return res.status(200).json({
            success: true,
            users: allUsers,
        })


    } catch (err) {
        return res.status(500).json({
            success: false,
            errror: {
                message: "Internal Server Error.",
                code: "INTERNAL_SERVER_ERROR"
            }
        })
    }
}

export const deleteUserById = async (req, res) => {
    try {

        const deleteId = req.params.id;
        const payload = req.payloadData;

        if (!mongoose.Types.ObjectId.isValid(deleteId)) {
            return res.status(400).json({
                success: false,
                error: {
                    message: "Invalid user ID",
                    code: "INVALID_ID"
                }
            });
        }

        const adminUser = await User.findById(payload.id);

        if (!adminUser) {
            return res.status(404).json({
                success: false,
                error: {
                    message: "User not found.",
                    code: "USER_NOT_FOUND"
                }
            })
        }

        if (adminUser.role !== "admin") {
            return res.status(403).json({
                success: false,
                error: {
                    message: "You are not authorized to perform this action.",
                    code: "FORBIDDEN"
                }
            })
        }

        const targetUser = await User.findById(deleteId);

        if (!targetUser) {
            return res.status(404).json({
                success: false,
                error: {
                    message: "Target user does not found.",
                    code: "RESOURCE_NOT_FOUND"
                }
            })
        }

        await User.deleteOne({ _id: deleteId });

        return res.status(200).json({
            success: true,
            message: "Resource deleted successfully."
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: {
                message: "Internal server error.",
                code: "INTERNAL_SERVER_ERROR"
            }
        })
    }

}

export const getUserById = async (req, res) => {
    try {

        const targetUserId = req.params.id;
        const payload = req.payloadData;

        if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
            return res.status(400).json({
                success: false,
                error: {
                    message: "Invalid User ID.",
                    code: "INVALID_ID"
                }
            })
        }

        const adminUser = await User.findById(payload.id);

        if (!adminUser) {
            return res.status(404).json({
                success: false,
                error: {
                    message: "User not found.",
                    code: "USER_NOT_FOUND"
                }
            })
        }

        if (adminUser.role !== "admin") {
            return res.status(403).json({
                success: false,
                error: {
                    message: "You are not authorized to access this resource.",
                    code: "FORBIDDEN"
                }
            })
        }

        const targetUser = await User.findById(targetUserId);

        if (!targetUser) {
            return res.status(404).json({
                success: false,
                error: {
                    message: "User not found.",
                    code: "RESOURCE_NOT_FOUND"
                }
            })
        }

        return res.status(200).json({
            success: true,
            data: targetUser
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: {
                message: "Internal server error.",
                code: "INTERNAL_SERVER_ERROR"
            }
        })
    }
}

// export const deleteUser = async(req, res) => {
//     res.send("delete User Here");
// }

