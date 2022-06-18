const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Connected to DB"))
  .catch((err) => console.error(err));
