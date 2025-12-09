import { User } from "../models/userModel.js";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password
        })
        await newUser.save();
        res.status(201).json({
            success: true,
            messsage: 'User registered succesfully',
            user: newUser
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}