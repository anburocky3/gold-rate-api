const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = 3000;

// Example scraping route
app.get("/scrape", async (req, res) => {
  try {
    // Replace with the URL you want to scrape
    const response = await axios.get("http://example.com");
    const html = response.data;
    const $ = cheerio.load(html);

    // Example: Extracting titles from a webpage
    const titles = [];
    $("h1").each((index, element) => {
      titles.push($(element).text());
    });

    res.json({ titles });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
