import fetch from "node-fetch";
import { load } from "cheerio";
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
