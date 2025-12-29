const User=require("../models/user");
const getPublicProfile=async (req,res)=>{
    try {
        const {username}=req.params;
        const user=await User.findOne({username}).select("username createdAt")
        if(!user){
            // return res.status(400).json({message:"User not found"});
            const err=new Error("User not found");
            err.statusCode=404;
            throw err;
        }
        res.status(200).json(user);
    } catch (error) {
        // res.status(500).json({ message: "Server error" });
        next(error);
    }
}
module.exports=getPublicProfile