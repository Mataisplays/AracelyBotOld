const mongoose = require("mongoose");
const config = require("../config");


mongoose
  .connect(config.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Estoy Conectado a MongoDB"));

  const zeeco = require("zeew-eco");
new zeeco.Options(config.mongo)