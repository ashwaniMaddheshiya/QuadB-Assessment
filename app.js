const express = require("express");
const mongoose = require("mongoose");
const Crypto = require("./models/cryptoModel");
const axios = require("axios");
const cors = require("cors");
const dotenv = require('dotenv')


dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: false,
    origin: "http://127.0.0.1:5500",
  })
);
app.use(express.static("public")); // serving static files


// DB connectivity
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const api = "https://api.wazirx.com/api/v2/tickers";

const fetchData = async () => {
  const response = await axios.get(api);
  const data = await response.data;
  const dataToSave = Object.keys(data)
    .slice(0, 10) // Slice the first 10 keys (records)
    .map((key) => ({
      base_unit: key,
      last: data[key].last,
      buy: data[key].buy,
      sell: data[key].sell,
      volume: data[key].volume,
      name: data[key].name,
    }));
  // console.log(dataToSave);
  await Crypto.insertMany(dataToSave);
};

fetchData();

app.get("/api/getData", async (req, res) => {
  try {
    const data = await Crypto.find().limit(10);
    res.json(data);
  } catch (err) {
    console.log({ message: err.message });
  }
});

app.listen(5000, () => {
  console.log("Connected to the port 5000");
});

