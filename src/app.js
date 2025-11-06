const express = require("express");
const connectDB= require("./config/database")
const app = express();

const User = require("./models/user.js")
app.use(express.json());
app.post("/signUp", async (req,res)=>{
    console.log("incoming body", req.body)
    const userObj = new User(req.body);
    try{
    await userObj.save();
    res.send("user Added successfully ")
    }
   catch(err){
    res.status(400).send("Error saving the use "+err.mesaage)
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




 

