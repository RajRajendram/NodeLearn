const crypto = require('crypto');
const User = require('../models/userModel');
const sendEmail = require('../utils/emailService');
const {validatePassword} = require('../utils/validators');
const jwt = require('jsonwebtoken');

//Request OTP for password Reset
const requestPasswordReset = async (req, res) => {
    const {email} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        //Generate a random OTP (6 digit)
        const otp = crypto.randomInt(100000, 999999).toString();

        //Save OTP and expiration time in the user's record
        user.resetOtp = otp;
        user.resetOtpExpires = Date.now()+ 10*60*1000; //OTP Valid for 10 minutes
        console.log(user.resetOtpExpires);
        console.log(Date.now());
        await user.save();

        // Send the OTP via email
        const message = `Your password reset OTP is: ${otp}. Its is valid for 10 minutes`;
        await sendEmail(user.email, 'Password Reset OTP', message);

        res.status(200).json({message: 'OTP sent to your email'});
    }catch(error){
        res.status(500).json({message: 'Error sending OTP, Please try again later'});
    }
};

// Verfy OTP
const verifyOtp = async (req,res) => {
    const {email, otp} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user || !user.resetOtp || new Date(user.resetOtpExpires).getTime() < Date.now()){
            return res.status(400).json({message: 'OTP IS INVALID OR HAS EXPIRED'})
        }

        if(user.resetOtp !== otp){
            return res.status(400).json({message: 'Incorrect OTP'});
        }

        // OTP is valid, clear the restOtp fields and allow password reset 
        user.resetOtp = undefined;
        user.resetOtpExpires = undefined;
        await user.save();

        res.status(200).json({message: 'OTP Verified sucessfully'});
    }catch(error){
        res.status(500).json({message: 'Error verifying OTP'});
    }
};

//Rest Password
const resetPassword = async (req, res) => {
    const {email, newPassword} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message: 'User not found'});
        };

        //Update user password
        user.password = newPassword; //password will be hashcoded pre-save hook
        await user.save();

        res.status(200).json({message: 'Password reset sucessfully'});
    }catch (error){
        res.status(500).json({message: 'Error resetting password'});
    };
};

// Register new user
const registerUser = async (req, res) => {
    const { name, email, phone, city, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    //Validate password using the new criteria
    const {valid, message} = validatePassword(password);
    if(!valid){
        return res.status(400).json({message});
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            name,
            email,
            phone,
            city,
            password,
            role: role || 'user',
        });

        await user.save();

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
        // res.status(201).json({message: 'User Created Sucessfully'});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
            // res.status(200).json({message: 'Login sucessful'})
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user Profile
const updateUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id);

        if(user){
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.city = req.body.city || user.city;

            if(req.body.password){
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                city: updatedUser.city,
                role: updatedUser.role,
            });
        }else{
            res.status(404).json({message: 'User not found'});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

//Delete user
const deleteUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);

        if(user){
            await User.findByIdAndDelete(req.params.id);
            res.json({message: 'user deleted sucessfully'})
        }else{
            res.status(404).json({message: 'User not found'});
        }
    }catch (error){
        res.status(500).json({message: error.message});
    }
}

// Get all users (admin only)
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Logout Controller Function, Array Function
const logoutUser = (req, res) => {
    //Clear the cookie if you are using cookies to store JWT
    res.cookie('jwt', '', {
        expires: new Date(0), //Expire the cookie immediately
    });
    res.status(200).json({message: 'User logged out sucessfully'});
}

// JWT token generation
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = { registerUser, loginUser, getUsers, updateUserProfile, deleteUser, logoutUser, requestPasswordReset, verifyOtp, resetPassword };
