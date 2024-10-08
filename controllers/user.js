const User = require("../models/user.models")

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({}, {
            id: true,
            name: true,
            age: true
        }).exec();


        return res.status(200).json({
            success:true,
            message:'Data for all users fetched successfully',
            data: allUsers,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Failed to show all users',
            error: error.message,
        })
    }
}

const createUser = async (req, res) => {
    try {
        const { id, name, age } = req.body;
        if(!id || !name) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }

        const newUser = await User.create({
            id, 
            name, 
            age
        });
        
        return res.status(201).json({
            success: true,
            newUser,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Failed to add a new User',
            error: error.message,
        })
    }
    
}

module.exports = { getAllUsers, createUser };