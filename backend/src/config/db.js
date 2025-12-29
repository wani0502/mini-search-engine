const mongoose=require("mongoose")
async function connectMongoDB(url){
    try {
        await mongoose.connect(url);
    console.log("MongoDB Connected");
    } catch (error) {
        throw error;
    }
}
module.exports={
    connectMongoDB
}