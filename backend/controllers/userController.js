import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { Session } from "../models/sessionModel.js";
import { sendOTPMail } from "../emailVerify/sendOTPMail.js";

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

        const hashedPassword = await bcrypt.hash(password, 10) //password security 

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '10m' })
        verifyEmail(token, email); //send email here
        newUser.token = token;

        await newUser.save();
        return res.status(201).json({
            success: true,
            message: 'User registered succesfully',
            user: newUser
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const verify = async (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(400).json({
                success: "false",
                message: "Authorization token is missing or invalid"
            })
        }
        const token = authHeader.split(" ")[1] //[Bearer, fasdajkfhdfhash]

        let decoded
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY)

        } catch (error) {
            if (error.name === "TokenExpiredError") {
                res.status(400).json({
                    success: "false",
                    message: "The registration token has expired"
                })
            }
            return res.status(400).json({
                success: "false",
                message: "Token verification failed"
            })
        }
        const user = await User.findById(decoded.id)
        if (!user) {
            res.status(400).json({
                success: "false",
                message: "user not found"
            })
        }
        user.token = null
        user.isVerified = true;
        await user.save();

        return res.status(200).json({
            success: "true",
            message: "Email verified succesfully"
        })

    } catch (error) {
        res.status(500).json({
            success: "false",
            message: error.message
        })
    }
}

export const reVerify = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                success: false,
                message: 'User not found '
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '10m' })
        verifyEmail(token, email); //send email here
        user.token = token;
        await user.save()
        return res.status(200).json({
            success: "true",
            message: "Verificatoin email sent again succesfully",
            token: user.token
        })

    } catch (error) {
        res.status(500).json({
            success: "false",
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'All fiels are required'
            })
        }

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordValid) {
            res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        if (existingUser.isVerified === false) {

            res.status(400).json({
                success: false,
                message: "verify your account than login"
            })
        }

        const accessToken = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '10d' })
        const requestToken = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '10d' })

        existingUser.isLoggedin = true;
        await existingUser.save();

        //check for existing session and delete it 
        const existingSession = await Session.findOne({ userId: existingUser._id });
        if (existingSession) {
            await Session.deleteOne({
                userId: existingSession._id
            })
        }
        //create a new session
        await Session.create({ userId: existingUser._id })
        return res.status(200).json({
            success: true,
            message: `Welcome back ${existingUser.firstName}`,
            user: existingUser,
            accessToken,
            requestToken
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        const userId = req.id
        await Session.deleteMany({ userId: userId })
        await User.findByIdAndUpdate(userId, { isLoggedin: false })
        return res.status(200).json({
            success: true,
            message: "logout succesfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generate otp 
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10mins me expire
        user.otp = otp;
        user.otpExpiry = otpExpiry;

        await user.save();
        await sendOTPMail(otp, email);

        return res.status(200).json({
            success: true,
            message: 'Otp sent to email successfully'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const verifyOTP = async (req, res) => {
    try {
        const { otp } = req.body;
        const email = req.params.email;

        if (!otp) {
            return res.status(400).json({
                success: false,
                message: 'Otp is required'
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'user not found'
            })
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: 'Otp is not generated or already verfied'
            })
        }

        if (user.otpExpiry < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'otp has expired please request new one'
            })
        }

        if (otp !== user.otp) {
            return res.status(400).json({
                success: false,
                message: 'Otp is invalid'
            })
        }

        user.otp = null
        user.otpExpiry = null
        await user.save()
        return res.status(200).json({
            success: true,
            message: 'otp verified succesfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.messsage
        })
    }
}

export const changePassword = async (req, res) => {
    try {
        const { newPassword, confirmPassword } = req.body;
        const { email } = req.params;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'user not found'
            })
        }

        if (!newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'All field are required'
            })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password do not match"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'password changed succesfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.messsage
        })
    }
}

export const allUser = async (_, res) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getuserbyID = async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await User.findById(userid).select("-password -otp -otpExpiry -token")
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



