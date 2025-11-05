const express = require("express");

const app = express();

app.use("/users", (req,res,next) => {
    // res.send("1st response");
    next();
},
(req,res,next) => {
    // res.send("2nd response");
    next();
},
(req,res)=> {
    res.send("final response")
}
)

app.listen(3000,()=>{
    console.log("server is successfully listening on this port ")
});