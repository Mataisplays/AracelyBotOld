const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Inventory = new Schema({
    user: { type: String },
    inventory: { type: Array }
})

module.exports = mongoose.model("Inventory", Inventory)
