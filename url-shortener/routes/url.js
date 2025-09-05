const Url = require("../models/Url");
const { nanoid } = require("nanoid");

const shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json({ error: "Long URL is required" });
    }

    // generate unique short code
    const code = nanoid(6);

    // create full short url
    const shortUrl = `http://localhost:5000/${code}`;

    // save to DB
    await Url.create({ longUrl, code });

    // 👇 very important: must match frontend expectation
    res.json({ shortUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ code: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: "URL not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { shortenUrl, redirectUrl };
