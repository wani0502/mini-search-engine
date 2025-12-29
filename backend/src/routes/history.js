const express=require("express");
const router=express.Router();
const getSearchHistory=require("../controllers/history");
const checkAuth=require("../middlewares/authMiddleware");
router.get("/",checkAuth,getSearchHistory);
module.exports=router;