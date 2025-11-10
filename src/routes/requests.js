const express = require("express");
const userAuth = require("../middlewares/auth")
const requestRouter = express.Router()
const ConnectionReqModel = require("../models/connectionRequest")
const User = require("../models/user")
requestRouter.post("/request/send/:status/:toUserId",
    userAuth,
    async (req,res)=> {

    try{ 
    const fromUserId= req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["Interested","Ignored"];

    if(!allowedStatus.includes(status)){
        // throw new Error("Invali status type ")
        return res.status(400).json({message:"Invalid status type"});
    }
    if(fromUserId.toString()===toUserId.toString()){
        return res.status(400).send("id should not be same ")
    }
    const toUser = await User.findById(toUserId);
    if(!toUser){
        return res.status(400).send("user does not exist ")
    }
    // If there is existing connection req 

    const existingConnReq = await ConnectionReqModel.findOne({
        $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId},
        ],
    });
    if(existingConnReq){
        return res.status(400).send("User already exists");
    }
     console.log(fromUserId);
    const ConnectionReq = new ConnectionReqModel({
        fromUserId,
       
        toUserId,
        status
    }) 
    const data = await ConnectionReq.save();
    res.json({
        message: req.user.firstName+" is "+status+" in "+toUser.firstName,
        data
    })
    }
    catch(err){
        res.status(400).send(err.message)
    }


})

module.exports = requestRouter;