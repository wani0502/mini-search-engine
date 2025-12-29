const express=require("express");
const router=express.Router();
const {signUp,login}=require("../controllers/auth");
const checkAuth=require("../middlewares/authMiddleware")
router.post("/signup",signUp);
router.post("/login",login);
router.post("/logout", checkAuth, (req, res) => {
  res.status(200).json({
    message: "Logged out successfully"
  });
});
module.exports=router;