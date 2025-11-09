const express = require("express");
const User = require("../models/user.js")
const authRouter = express.Router();
const {validateSignUpdata} = require("../utils/validation.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
authRouter.post("/signUp", async (req,res)=>{
    console.log("incoming body", req.body);

    
    // encrypt the pass word and then store the data into database 
    
    
    try{
         //validation of data
     validateSignUpdata(req);


     //encryiping your password use decrypt package 

     const {firstName,lastName,emailId,password} = req.body;
     //encrypting
     const passwordHash = await  bcrypt.hash(password,10);
     console.log(passwordHash);
     const userObj = new User({firstName,lastName,emailId,password : passwordHash});
    await userObj.save();
    res.send("user Added successfully ")
    }
   catch(err){
    console.log("Error"+err)
    res.status(400).send("Error saving the use "+err.message)
   }

})

authRouter.post("/login",async (req,res)=> {
    try{
        const{emailId,password} = req.body;
        const user = await User.findOne({emailId:emailId})
        if(!user){
            throw new Error("Invalid credentials ");
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            throw new Error("Invalid credentials");
        }
        else{
            //create a jwt token 
            const token = await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"1d"});
            console.log(token);

            //add the token to cookie and res back to user 
            res.cookie("token",token);


            res.send("Successfull login")
        }
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = authRouter;