import { load } from "cheerio";
import express from "express";
import serverless from "serverless-http";
import axios from "axios";

const app = express();
const router = express.Router();
const port = 3000;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

router.get("/", async (req, res) => {
  return res.send({
    message: "Hello world!",
  });
});

router.get("/mjdta", async (req, res) => {
  let url = "https://thejewellersassociation.org/index.php";

  // request(url, function (error, response, html) {
  //   if (!error) {
  //     const $ = cheerio.load(html);
  //   }
  // });
  const response = await axios.get(url);

  setTimeout(() => {
    const html = response.data;

    const $ = load(html, null, false);

    var prediction = $("#goldrate_22ct").text();

    var json = {
      prediction: prediction,
      status: true,
    };

    return res.send(json);
  }, 3000);
});

router.get("/lalitha", async (req, res) => {
  let url = "https://www.lalithaajewellery.com";

  const response = await axios.get(url);

  const html = response.data;

  const $ = load(html, null, false);

  var prediction = $('[data-target="#price"]').text();

  var json = {
    entity: "lalithaajewellery",
    gold_22k_1g: parseFloat(
      prediction.match(/(?<=Today: Gold 22k - 1g = Rs. )\d+(>=?|)/g)[0]
    ),
    silver_1g: parseFloat(
      parseFloat(
        prediction.match(/(?<=Today: Silver 1g = Rs. )\d+\.\d+(>=?|)/g)[0]
      ).toFixed(2)
    ),
    platinum_1g: parseFloat(
      prediction.match(/(?<=Today: Platinum 1g = Rs. )\d+(>=?|)/g)[0]
    ),
    prediction: prediction,
    source: url,
    status: true,
  };

  return res.send(json);
});

app.get("/saravana-stores", async (req, res) => {
  let url = "https://www.saravanastores.in";

  const response = await axios.get(url);

  const html = response.data;

  const $ = load(html, null, false);

  var prediction = $("span").text();

  var json = {
    entity: "saravana-stores",
    gold_22k_1g: 0,
    silver_1g: 0,
    platinum_1g: 0,
    prediction: prediction,
    source: url,
    status: true,
  };

  return res.send(json);
});

app.use("/api/", router);

// app.listen(port, () => {
//   console.log(`Server started at http://localhost:${port}`);
// });
export const handler = serverless(app);
