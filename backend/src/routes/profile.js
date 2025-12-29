const express=require("express");
const router=express.Router();
const getPublicProfile=require("../controllers/profile")
router.get("/:username",getPublicProfile)
module.exports=router;