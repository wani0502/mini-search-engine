const extractWords = (text) => {
  return text
    .toLowerCase()
    .split(/\W+/)
    .filter(Boolean);
};

module.exports = extractWords;
