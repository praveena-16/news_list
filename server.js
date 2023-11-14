const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 5000;

// Allow CORS (for development purposes; tighten in production)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Route to fetch and serve data from an external URL
app.get("/api/data", async (req, res) => {
  try {
    const { page } = req.query;
    const externalData = await axios.get(
      `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${
        page || 1
      }`
    );
    res.json(externalData.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
