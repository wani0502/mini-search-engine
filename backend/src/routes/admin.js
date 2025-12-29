const express=require("express");
const router=express.Router();
const checkAuth=require("../middlewares/authMiddleware")
const isAdmin=require("../middlewares/admin")
const {getAllDocuments,deleteDocument}=require("../controllers/admin");
router.get("/documents",checkAuth,isAdmin,getAllDocuments);
router.delete("/documents/:id",checkAuth,isAdmin,deleteDocument);
module.exports=router;