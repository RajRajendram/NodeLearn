// Aset of commonly used passwords that shouldn't be allowed

const commonPasswords = ['password', '123456', '123456789', 'qwerty', 'abc123', 'password1', '123123', '111111', 'letmein'];

//Function to validate password based on vareious criteria

const validatePassword = (password) => {
    console.log('password to validate', password);
    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

    // const isValid = passwordRegex.test(password);
    if(passwordRegex.test(password)){
        console.log('Valid password')
    }else{
        console.log('Not a valid password');
    }

    //Check if password meets the regex criteria (at least one uppercase, lowercase, didit, special character, and minimun 8 vhars)
    // if(!isValid){
    //     return {
    //         valid: false,
    //         message: 'Password must be at least 8 characters long, conatin one uppercase, one lowercase, one number, and one special character [@$!%?&]'
    //     };
    // };

    //Check the password contsains spaces
    const hasSpaces = /\s/.test(password);
    if(hasSpaces){
        return {
            valid: false,
            message: 'Password must not contain spaces'
        }
    }
   
    // Check if password is too common
    // if(commonPasswords.includes(password.toLowercase())){
    //     return {
    //         valid: false,
    //         message: 'Password is too common, Please chooses a more secure password'
    //     }

    // }

    //If all checks pass, return valid
    return {valid: true};
}

module.exports = {validatePassword};