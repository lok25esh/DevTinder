const express = require("express");
const connectDB= require("./config/database")
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());



const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/requests")

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

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


 

