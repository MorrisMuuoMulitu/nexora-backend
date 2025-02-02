require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());

// Route to fetch news
app.get("/news", async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    const { category, q, page = 1, pageSize = 10 } = req.query;
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    if (category) url += `&category=${category}`;
    if (q)
      url = `https://newsapi.org/v2/everything?q=${q}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    const response = await axios.get(url);
    res.status(200).json(response.data.articles);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Nexora server running on port ${PORT}`);
});
