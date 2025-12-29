require("dotenv").config();
const app=require("./src/app");
const PORT=process.env.PORT;
const URL=process.env.MONGO_URL;
const {connectMongoDB}=require("./src/config/db")
connectMongoDB(URL);
app.listen(PORT,()=>{
    console.log(`Server started at port : ${PORT}`);
})