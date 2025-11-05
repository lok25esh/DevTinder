const express = require("express");

const app = express();

app.use("/admin",(req,res,next)=> {
    console.log("Authorization is done here")
     const token = "xyzccd";
     const isAdminAuth = token === "xyz"
     if(!isAdminAuth){
        res.status(401).send("Unauthorized");
        
     }
     next();

})

app.get("/admin/getsData",(req,res)=> {
    res.send("Admin gets the data ")
})

app.listen(3000,()=>{
    console.log("server is successfully listening on this port ")
});