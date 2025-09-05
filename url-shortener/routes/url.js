const express = require("express");
const router = express.Router();
const { shortenUrl, redirectUrl } = require("../controllers/urlController");

// Route to shorten URL
router.post("/shorten", shortenUrl);

// Route to redirect short URL
router.get("/:code", redirectUrl);

module.exports = router;
