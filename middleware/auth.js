const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Protect routes with JWT verification
const protect = async (req, res, next) => {
    let token;

    // Check if the Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the 'Bearer <token>' format
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using the secret key from environment variables
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user from the database using the ID from the token
            // Select all fields except the password ('-password' excludes it)
            req.user = await User.findById(decoded.id).select('-password');

            // Continue to the next middleware or route handler
            next();
        } catch (error) {
            // If token verification fails, send a 401 Unauthorized response
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        // If there's no token, return an error
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Restrict access to admin users only
const admin = (req, res, next) => {
    // Check if the user exists and has the 'admin' role
    if (req.user && req.user.role === 'admin') {
        next(); // Continue if the user is an admin
    } else {
        // If the user is not an admin, return a 401 Unauthorized error
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };
