const express = require('express');
const { registerUser, loginUser, getUsers, updateUserProfile, deleteUser, logoutUser, requestPasswordReset, verifyOtp,resetPassword } = require('../controllers/userController'); // Import controllers
const { protect, admin } = require('../middleware/auth'); // Import middleware
const router = express.Router();

// Route to register a user
router.post('/register', registerUser);

// Route to log in a user
router.post('/login', loginUser);

//Update user profile
router.put('/profile/:id', protect, admin, updateUserProfile);

//Delete user
router.delete('/delete/:id', protect, admin, deleteUser);

// Route to get all users (only accessible by admins)
router.get('/', protect, admin, getUsers);

//Logout user
router.post('/logout', protect, logoutUser);

//Route to request otp for the password reset
router.post('/forgot-password', requestPasswordReset);

//Route to verify OTP
router.post('/verify-otp', verifyOtp);

//Route to reset password
router.post('/reset-password', resetPassword);

module.exports = router;
