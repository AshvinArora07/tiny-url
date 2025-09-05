// controllers/urlController.js
const Url = require("../models/Url");
const shortid = require("shortid");

const shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    // generate short code
    const urlCode = shortid.generate();

    // save to DB (store shortUrl as code only)
    const url = new Url({ longUrl, shortUrl: urlCode, urlCode, date: new Date() });
    await url.save();

    // return only the short code
    res.json({ shortUrl: urlCode });

  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};

const redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No URL found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};

module.exports = { shortenUrl, redirectUrl };
