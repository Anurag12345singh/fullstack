const axios = require("axios");
const express = require("express");
const { URLSearchParams } = require("url");
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { translation: null, error: null });
});

app.post("/translate", async (req, res) => {
  const { text, targetlang } = req.body;
  const encodedParams = new URLSearchParams();
  encodedParams.set("q", text);
  encodedParams.set("target", targetlang);
  encodedParams.set("source", "en");

  const options = {
    method: "POST",
    url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "88603ba97fmsh3176987b3020f21p14c04fjsn20c9e8798414",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      "Accept-Encoding": "application/gzip",
    },
    data: encodedParams.toString(),
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to translate text" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
