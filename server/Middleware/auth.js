const jwt = require('jsonwebtoken');
const User = require('../Database/Models/User');

require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticate = async (req, res, next) => {
    const token = req.header('Authentication')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            message: 'Authentication Required!'
        })
    }

    try {
        const decoded = jwt.decode(token, JWT_SECRET_KEY);

        const user = await User.findById(decoded.userId);

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        next();
    }
    catch (error) {
        res.status(403).json({
            message: 'You must login to the system!'
        })
    }
}

const authorize = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next()
        } else {
            res.status(403).json({
                message: 'Access Denied!'
            })
        }
    }
}

module.exports = {authorize, authenticate};