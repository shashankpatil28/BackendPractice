require("dotenv").config();
const User = require("../models/user.models")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { id, name, email, password, confirmPassword } = req.body;

        // Check if all fields are provided
        if (!id || !name || !email || !password || !confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "Fill all details",
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "Passwords don't match",
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "Email already exists",
            });
        }

        // Hash the password
        const hashedPwd = await bcrypt.hash(password, 10);  // <-- Use 'await' here
        
        // Create a new user
        const newUser = await User.create({
            id,
            name,
            email,
            password: hashedPwd,  // Store the hashed password
        });

        // Respond with success
        return res.status(200).json({
            success: true,
            message: 'User is registered Successfully',
            newUser,
        });

    } catch (error) {
        // Catch any errors and respond
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again",
            error: error.message,  // Include the error message for debugging
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email or Password is empty',
            });
        }

        // Find the user by email
        const existingUser = await User.findOne({ email });

        // Check if user exists
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email not registered',
            });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect',
            });
        }

        // Create a payload for JWT
        const payload = {
            id: existingUser.id,  // Use _id since MongoDB generates this automatically
            name: existingUser.name,
            email: existingUser.email,
        };

        // Generate a JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '4h',
        });

        // Set options for the cookie
        const options = {
            expires: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),  // 4 days expiry
            httpOnly: true,
        };

        // Send the response with token in a cookie and JSON response
        return res.cookie('token', token, options).status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: existingUser,
        });

    } catch (error) {
        // Catch any errors
        return res.status(500).json({
            success: false,
            message: 'Login Failure, please try again',
            error: error.message,  // Include the error message for better debugging
        });
    }
};

module.exports = { login };

module.exports = { login, signup }