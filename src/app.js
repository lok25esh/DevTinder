const express = require("express");
const connectDB= require("./config/database")
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());



const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile")

app.use("/",authRouter);
app.use("/",profileRouter);

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
 

