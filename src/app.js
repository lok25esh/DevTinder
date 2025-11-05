const express = require("express");

const app = express();
const {adminAuth, userAuth} = require("./middlewares/auth.js")
app.use("/admin",adminAuth)

app.get("/admin/getsData",(req,res)=> {
    res.send("Admin gets the data ")
})

app.get("/user/getData", userAuth, (req,res)=> {
    res.send("gets the userdata")
})

app.post("/user/postData", (req,res)=> {
    res.send("posted the data to database ")
})
app.listen(3000,()=>{
    console.log("server is successfully listening on this port ")
});