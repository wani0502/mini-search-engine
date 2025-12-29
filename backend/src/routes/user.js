const express=require("express");
const router=express.Router();
const checkAuth=require("../middlewares/authMiddleware")
const {getUserProfile,updateProfile}=require("../controllers/user");
router.get("/me",checkAuth,getUserProfile);
router.patch("/",checkAuth,updateProfile)
module.exports=router;