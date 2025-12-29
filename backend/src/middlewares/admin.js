const User=require("../models/user")
const isAdmin=async(req,res)=>{
    if(req.user.role!="admin"){
        const err=new Error("Admin only");
        err.statusCode=403;
        throw err;
    }
}
module.exports=isAdmin;