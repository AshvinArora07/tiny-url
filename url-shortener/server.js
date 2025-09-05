const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(cors());          // allow requests from frontend
app.use(express.json());  // parse incoming JSON

// ✅ Connect DB
connectDB();

// ✅ Routes
app.use("/", require("./routes/url"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

