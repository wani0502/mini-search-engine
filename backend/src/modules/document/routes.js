const express=require("express");
const router=express.Router();
const {upload}=require("./middleware")
const {editDoc, uploadDoc,deleteDoc,toggle,getDocument, getMyDocuments,getPublicDocuments}=require("./controller");
const checkAuth=require("../../middlewares/authMiddleware");
router.post("/upload",checkAuth,upload.fields([{ name: "file", maxCount: 1 }])
,uploadDoc);
router.put("/edit/:id",checkAuth,editDoc);
router.delete("/:id",checkAuth,deleteDoc);
router.patch("/:id/access",checkAuth,toggle);
router.get("/me",checkAuth,getMyDocuments);
router.get("/public",getPublicDocuments);
router.get("/:id",getDocument);
module.exports=router;
