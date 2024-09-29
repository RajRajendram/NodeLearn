// A set of commonly used passwords that shouldn't be allowed
const commonPasswords = [
    'password', 
    '123456', 
    '123456789', 
    'qwerty', 
    'abc123', 
    'password1', 
    '123123', 
    '111111', 
    'letmein'
];

// Function to validate password based on various criteria
const validatePassword = (password) => {
    console.log('password to validate:', password);

    // 1. Check if the password contains spaces
    const hasSpaces = /\s/.test(password);
    if (hasSpaces) {
        return {
            valid: false,
            message: 'Password must not contain spaces'
        };
    }

    // 2. Check if the password is too common
    if (commonPasswords.includes(password.toLowerCase())) {
        return {
            valid: false,
            message: 'Password is too common, please choose a more secure password'
        };
    }

    // 3. Regex to check if the password meets the criteria (at least one uppercase, lowercase, digit, special character, and minimum 8 chars)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        return {
            valid: false,
            message: 'Password must be at least 8 characters long, contain one uppercase, one lowercase, one number, and one special character [@$!%?&]'
        };
    }

    // If all checks pass, return valid
    return { valid: true,
            message: 'Password is strong'
     };
}

module.exports = { validatePassword };
