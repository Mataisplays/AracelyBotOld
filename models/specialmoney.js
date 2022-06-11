const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Economia = new Schema({
  user: { type: String },
  vainilla: { type: Number },
  dounas: { type: Number}
});
module.exports = mongoose.model("Monedas ", Economia); //
