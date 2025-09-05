// controllers/urlController.js
const Url = require("../models/Url");
const shortid = require("shortid");

const shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    // generate short code
    const urlCode = shortid.generate();
    const shortUrl = `${process.env.BASE_URL}/${urlCode}`;

    // save to DB
    const url = new Url({ longUrl, shortUrl, urlCode, date: new Date() });
    await url.save();

    // 👇 either return this
    // res.json({ shortUrl });  

    // 👇 OR this (so frontend stays same)
    // inside shortenUrl
    res.json({ shortUrl });

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
