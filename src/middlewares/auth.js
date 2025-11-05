const adminAuth = (req,res,next)=> {
    console.log("Authorization is done here")
     const token = "xyz";
     const isAdminAuth = token === "xyz"
     if(!isAdminAuth){
        res.status(401).send("Unauthorized");
        
     }
     else{
 next();
     }
    
}

const userAuth = (req,res,next)=> {
    console.log("Authorization is done here")
     const token = "xyz";
     const isAdminAuth = token === "xyz"
     if(!isAdminAuth){
        res.status(401).send("Unauthorized");
        
     }
     else{
 next();
     }
    
}

module.exports = {adminAuth,userAuth};
