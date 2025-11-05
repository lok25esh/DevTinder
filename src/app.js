const express = require("express");

const app = express();

app.use("/",(err,req,res,next)=> {
    if(err){
        res.status(500).send("something went wrong");
    }
})


app.get("/userdata", (req,res)=> {
        throw new Error("sjfjk");
        res.send("user data sent ")
    
})



 

app.listen(3000,()=>{
    console.log("server is successfully listening on this port ")
});