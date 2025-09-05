const validUrl = require("valid-url");

const validateUrl = (url) => {
  return validUrl.isUri(url);
};

module.exports = validateUrl;
