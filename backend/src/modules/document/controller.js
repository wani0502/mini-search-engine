const InvertedIndex = require("../../models/invertedIndex");
const extractWords = require("../../utils/extractWords");

const fs = require("fs");
const path = require("path");
const Document = require("./model");
console.log("CONTROLLER FILE LOADED");

const uploadDoc = async (req, res) => {
 
console.log("UPLOAD HIT");
console.log("REQ.BODY =", req.body);
console.log("REQ.FILES =", req.files);


    if (!req.files || !req.files.file) {
        return res.status(400).json({ success: false,
        message: "File required" })
    }
    const file=req.files.file[0]
    const { title, description, isPublic } = req.body;
 const allowedTypes = {
  "image/jpeg": "jpg",
  "image/png": "png"
};
 
const fileType = allowedTypes[file.mimetype];
if (!fileType) {
  return res.status(400).json({
    success: false,
    message: "Invalid file type",
  });
}

    const doc = await Document.create({
        title,
        description,
        fileUrl: file.filename,
        fileType,
        isPublic,
        uploadedBy: req.user.id
    });
    const text = `${title} ${description || ""}`;
    const words = extractWords(text);

    for (const word of words) {
        await InvertedIndex.findOneAndUpdate(
            { word },
            { $addToSet: { documents: doc._id } },
            { upsert: true }
        );
    }

   res.status(201).json({
  success: true,
  message: "Document uploaded successfully",
  document: doc,
});

}
const editDoc = async (req, res) => {
    const { id } = req.params;
    const { title, description, isPublic } = req.body;
    const doc = await Document.findById(id);
    if (!doc) {
        const err = new Error("Document not found");
        err.statusCode = 404;
        throw err;
    }
    if (doc.uploadedBy.toString() !== req.user.id) {
        const err = new Error("Not allowed");
        err.statusCode = 403;
        throw err;
    }
    await InvertedIndex.updateMany(
        {},
        { $pull: { documents: doc._id } }
    );

    if (title !== undefined) {
        doc.title = title;
    }
    if (description !== undefined) {
        doc.description = description;
    }
    if (isPublic !== undefined) {
        doc.isPublic = isPublic;
    }
    await doc.save();
    const text = `${doc.title} ${doc.description || ""}`;
    const words = extractWords(text);

    for (const word of words) {
        await InvertedIndex.findOneAndUpdate(
            { word },
            { $addToSet: { documents: doc._id } },
            { upsert: true }
        );
    }
    res.json(doc);
}
const deleteDoc = async (req, res) => {
    const { id } = req.params;
    const doc = await Document.findById(id);
    if (!doc) {
        const err = new Error("Document not found");
        err.statusCode = 404;
        throw err;
    }
    if (doc.uploadedBy.toString() !== req.user.id) {
        const err = new Error("Not allowed");
        err.statusCode = 403;
        throw err;
    }
    await InvertedIndex.updateMany(
        {},
        { $pull: { documents: doc.id } }
    );
    const uploadsDir = path.join(__dirname, "../../uploads");
    const filePath = path.join(uploadsDir, doc.fileUrl);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    await Document.findByIdAndDelete(id);
    res.json({ 
        success:true,
        message: "Document deleted successfully" })
}
const toggle = async (req, res) => {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
        const err = new Error("Document not found");
        err.statusCode = 404;
        throw err;
    }
    if (doc.uploadedBy.toString() !== req.user.id) {
        const err = new Error("Not allowed");
        err.statusCode = 403;
        throw err;
    }
    doc.isPublic = !doc.isPublic;
    await doc.save();
    res.json({
        success:true,
        id: doc._id,
        isPublic: doc.isPublic
    });
}
const getDocument = async (req, res) => {
    const doc = await Document.findById(req.params.id)
    if (!doc) {
        const err = new Error("Document not found");
        err.statusCode = 404;
        throw err;
    }
    if (!doc.isPublic) {
        if (!req.user || doc.uploadedBy.toString() !== req.user._id) {
            const err = new Errror("Private document");
            err.statusCode = 403;
            throw err;
        }
        res.json(doc);
    }
}
const getMyDocuments = async (req, res) => {
    const docs = await Document.find({
        uploadedBy: req.user.id
    });
   
    res.json({
    success: true,
    documents: docs,
  });
}

const getPublicDocuments = async (req, res) => {
    const docs = await Document.find({ isPublic: true })
    .populate("uploadedBy", "username");
   
   res.json({
    success: true,
    documents: docs,
  });
}
module.exports = {
    editDoc, uploadDoc, deleteDoc, toggle, getDocument, getMyDocuments, getPublicDocuments
}