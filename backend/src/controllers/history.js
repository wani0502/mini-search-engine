const User=require("../models/user")
const getSearchHistory=async(req,res,next)=>{
      try {
        const user=await User.findById(req.user.id).select("searchHistory");
        res.status(200).json(user.searchHistory)
      } catch (error) {
        next(error);
      }
}
module.exports=getSearchHistory;