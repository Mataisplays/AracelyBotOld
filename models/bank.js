const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Banco = new Schema({
  user: { type: String },
  money: { type: Number },
});
module.exports = mongoose.model("Banco ", Banco);
