const express=require("express")
const router=express.Router();
const search=require("../controllers/search");
const checkAuth=require("../middlewares/authMiddleware")
router.post("/",checkAuth,search);
module.exports=router;