const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const db = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.route");
const placeParkingRoutes = require("./routes/placesParking.route");

dotenv.config();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

db.MongoConnect();

app.use("/api/auth", authRoutes);
app.use("/api/placeParking", placeParkingRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
