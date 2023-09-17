const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const cryptoSchema = new Schema({
  base_unit: String,
  quote_unit: String,
  low: String,
  high: String,
  last: String,
  type: String,
  open: String,
  volume: String,
  sell: String,
  buy: String,
  at: Number,
  name: String,
});

const Crypto = mongoose.model('Crypto', cryptoSchema);
module.exports = Crypto;