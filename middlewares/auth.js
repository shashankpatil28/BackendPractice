require("dotenv").config();
const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.token || req.get("Authorization")?.replace("Bearer ", "");
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Invaild token."
            })
        } 
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Error in validating token"
        })
    }
}

module.exports = { auth };