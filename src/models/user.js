const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        lowecase:true,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:String
    },
    gender:{
        type:String
    }
});

const User= mongoose.model("User",userSchema);

module.exports = User;