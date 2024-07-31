const mongoose = require("mongoose")

const placeParkingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    etage: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    timeOccupation: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const PlaceParking = mongoose.model("placesParking", placeParkingSchema);

module.exports = PlaceParking;
