import asyncHandler from "express-async-handler"
import User from "../Models/UserModels.js"
import bcrypt from "bcryptjs";
import { generateToken } from "../Middlewares/Auth.js";

// @desc Register User
// @route POST /api/users/
// @access Public
const registerUser =  asyncHandler(async (req, res) => {
    const {firstName, lastName, email, password, image} = req.body
    try {
        const userExists = await User.findOne({email});
        //check if user exists
        if (userExists) {
            res.status(400);
            throw new Error ("User already exists");
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user in DB
        const user= await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image,
        });

        //if user created successfully send user data and token to client
        if (user) {
            res.status(201).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error ("Invalid user data");
        }

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

export { registerUser };