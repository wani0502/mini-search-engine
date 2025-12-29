const User=require("../models/user");
const createUser=(data)=>{
    return User.create(data);
}
const getUserByEmail=(email)=>{
    return User.findOne({email}).select("+password");
};
const getUserByUsername=(username)=>{
    return User.findOne({username});
};
module.exports={
    createUser,getUserByEmail,getUserByUsername
}