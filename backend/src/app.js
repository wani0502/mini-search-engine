const express=require("express");
const cors=require("cors");
const app=express();
const errorHandler=require("./middlewares/errorHandler")
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
const profileRoutes=require("./routes/profile")
const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");
const searchRoutes=require("./routes/search");
const historyRoutes=require("./routes/history");
const documentRoutes=require("./modules/document/routes");
const adminRoutes=require("./routes/admin");
app.get("/",(req,res)=>{
    console.log("Mini Search Engine started!")
     res.status(200).send("Mini Search Engine API is running");
});
app.use("/profile",profileRoutes);
app.use("/auth",authRoutes);
app.use("/user",userRoutes);
app.use("/search",searchRoutes);
app.use("/history",historyRoutes);
app.use("/document",documentRoutes);
app.use("/admin",adminRoutes);
app.use(errorHandler);
module.exports=app;