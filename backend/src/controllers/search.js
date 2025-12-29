const User = require("../models/user");
const Document = require("../modules/document/model");
const InvertedIndex = require("../models/invertedIndex");

const search = async (req, res, next) => {
 

  try {
    const { query } = req.body;

    if (!query) {
      const err = new Error("Query is required");
      err.statusCode = 400;
      throw err;
    }

    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { searchHistory: { query } }
      });
    }

    const words = query.toLowerCase().split(/\W+/);

    const indexEntries = await InvertedIndex.find({
      word: { $in: words }
    });

    const docIds = [
      ...new Set(indexEntries.flatMap(e => e.documents))
    ];

    if (docIds.length === 0) {
      return res.status(200).json([]);
    }

    let accessFilter = { isPublic: true };

    if (req.user) {
      accessFilter = {
        $or: [
          { isPublic: true },
          { uploadedBy: req.user.id }
        ]
      };
    }

   
    const docs = await Document.find({
      _id: { $in: docIds },
      ...accessFilter
    }).populate("uploadedBy", "username");


   res.json({
  success: true,
  results: docs,
});


  } catch (error) {
    next(error);
  }
};

module.exports = search;
