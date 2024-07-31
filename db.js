const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

function MongoConnect() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB is connected"))
    .catch((error) => console.log(error));
}

module.exports = { MongoConnect };
