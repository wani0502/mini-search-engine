const mongoose = require("mongoose");

const invertedIndexSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true
  },
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document"
  }]
});

module.exports = mongoose.model("InvertedIndex", invertedIndexSchema);
