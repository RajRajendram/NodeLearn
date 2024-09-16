const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Register new user 
const registerUser = async (req, res) => {
    const {name, email, phone, city, password, confirmPassword, role} = req.body;

    if (password !== confirmPassword){
        return res.status(400).json({message: 'Password do not match'});
    }

    try {
        const UserExists = await User.findOne({email});

        if(UserExists){
            return res.status(400).json({message: 'User already exist'});
        }
         const user = newUser({
            name,
            email,
            phone,
            city,
            password,
            role: role || 'user' // Default to 'user' is role is not provided
        });

        await user.save();
        res.status(201).json({message: 'User registered Sucessfully'});
    }catch (error) {
        res.status(500).json({message: 'Server error'});
    };
};

module.exports = {registerUser};