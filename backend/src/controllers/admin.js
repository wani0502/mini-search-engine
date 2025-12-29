const Document=require("../modules/document/model");
const fs=require("fs");
const path=require("path");
const getAllDocuments=async(req,res)=>{
    const docs=await Document.find().populate("uploadedBy","username email");
    res.json(docs);
}
const deleteDocument=async(req,res)=>{
    const doc=await Document.findById(req.params.id);
    if(!doc){
         const err=new Error("Document not found");
        err.statusCode=404;
        throw err;
    }
    const filePath=path.join(__dirname,"../../",doc.fileUrl);
    fs.unlink(filePath,(err)=>{
        if(err){
            console.log("File delete error",err.message);
        }
    })
    await doc.deleteOne();
    res.json({message: "Document deleted by admin"});
}
module.exports={
    deleteDocument,getAllDocuments
}