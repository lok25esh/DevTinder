const validator = require("validator")
const validateSignUpdata = (req)=> {
    const{firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName) {
        throw new Error("Name is not valid ")
    }
    else if (firstName.length < 4 || lastName.length<4) {
            throw new Error("length should between 4 and 50");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a Strong password ");
    }
};

module.exports = {validateSignUpdata};