const express = require("express");
const connectDB= require("./config/database")
const app = express();
const {validateSignUpdata} = require("./utils/validation.js")
const User = require("./models/user.js")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cookieParser());

app.post("/signUp", async (req,res)=>{
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

app.get("/user",async (req,res)=> {
    const userEmail = req.body.emailId;

    try{
       const user =  await User.find({emailId : userEmail});
       if(user.length === 1){
                   res.send(user)
       }
     else {
        res.status(400).send("could not find the user ")
     }
    }
    catch(err){
        res.status(400).send("Something went wrong ");
    }
})

//Feed API - GET /feed get all the users from the database 

app.get("/feed", async (req,res) => {
    try{
    const users = await User.find({});
    res.send(users)
    }
    catch(err){
        res.status(400).send("something went wrong")
    }
   
})

//delete user api 

app.delete("/user", async (req,res) => {
    const userId = req.body.userId;

    try{
         const user = await User.findByIdAndDelete(userId);
         res.send("user id deleted ")
    }
    catch(err){
        res.send("something went wrong")
    }
})

//Update the user 
app.patch("/user", async (req,res) => {
    const userid = req.body.userId;
    const data = req.body
    try{
   await User.findByIdAndUpdate({_id:userid},data);
   res.send("updated successfully");
    }
    catch(err){
            res.send(err);
    }
})

app.post("/login",async (req,res)=> {
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
            const token = await jwt.sign({_id:user._id},"DEV@Tinder$790");
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

app.get("/profile",async (req,res)=> {
    const cookie = req.cookies;
    console.log(cookie)
    const {token} = cookie;
    try{
            //validate my token 
    if(!token){
        throw new Error("token is emptyt")
    }
        const decoded = await jwt.verify(token,"DEV@Tinder$790");
  
     const {_id} = decoded;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User is not present")
    }
    res.send(user)

    }catch(err){
        res.send(err.message);
    }


})

connectDB()
.then(()=>{
    console.log("Database connection is established");
    app.listen(3000,()=>{
    console.log("server is successfully listening on this port ")
});
})
.catch((err)=>{
    console.error("Dtabase cannot be connected ")
})



console.log("end of the code ")
 

