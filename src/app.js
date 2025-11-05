const express = require("express");

const app = express();

app.use("/test",(req,res) => {
    res.send("hellow from the server ")
})

app.listen(3000,()=>{
    console.log("server is successfully listening on this port ")
});