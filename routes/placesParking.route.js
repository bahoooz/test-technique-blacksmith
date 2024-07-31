const express = require("express");
const {
  createPlaceParking,
  getPlacesParking,
  getPlaceParking,
  deletePlaceParking,
  updatePlaceParking,
} = require("../controllers/placeParking.controller");

const router = express.Router();

router.post("/create", createPlaceParking);
router.get("/getall", getPlacesParking);
router.get("/get/:placeParkingId", getPlaceParking);
router.delete("/delete/:placeParkingId", deletePlaceParking);
router.put("/update/:placeParkingId", updatePlaceParking);

module.exports = router;
