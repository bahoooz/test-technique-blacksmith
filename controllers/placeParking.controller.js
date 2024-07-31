const PlaceParking = require("../models/placeParking.model");

exports.createPlaceParking = async (req, res) => {
  const newPlaceParking = new PlaceParking({
    ...req.body,
  });
  try {
    const savedPlaceParking = await newPlaceParking.save();
    res.status(201).json({
      product: savedPlaceParking,
      message: "Création réussie de la place de parking !",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Echec de création de la place de parking",
      error: error.message,
    });
  }
};

exports.getPlacesParking = async (req, res) => {
  try {
    const placesParking = await PlaceParking.find();
    res.status(201).json(placesParking);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erreur lors de la récupération des places de parking",
      error: error.message,
    });
  }
};

exports.getPlaceParking = async (req, res) => {
  try {
    const placeParking = await PlaceParking.findById(req.params.placeParkingId);
    if (!placeParking) {
      return res.status(404).json({ message: "Place de parking non trouvée" });
    }
    res.json(placeParking);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erreur lors de la récupération de la place de parking",
      error: error.message,
    });
  }
};

exports.deletePlaceParking = async (req, res) => {
  try {
    await PlaceParking.findByIdAndDelete(req.params.placeParkingId);
    res.status(200).json({ message: "La place de parking a été supprimée" });
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la suppression de la place de parking",
      error: error.message,
    });
  }
};

exports.updatePlaceParking = async (req, res) => {
  try {
    const updatedPlaceParking = await PlaceParking.findByIdAndUpdate(
      req.params.placeParkingId,
      {
        $set: {
          name: req.body.name,
          etage: req.body.etage,
          isAvailable: req.body.isAvailable,
          timeOccupation: req.body.timeOccupation,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPlaceParking);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la mise a jour de la place de parking",
      error: error.message,
    });
  }
};
