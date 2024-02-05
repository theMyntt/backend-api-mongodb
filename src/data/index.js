const mongoose = require("mongoose");
const MONGO_URI = "mongodb://localhost:27017/User";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Mongo connected on " + MONGO_URI);
  })
  .catch((error) => {
    console.error("Failed to connect: " + error);
  });

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("info", schema);
module.exports = collection;