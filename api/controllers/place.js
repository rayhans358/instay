const Place = require("../models/place");
const jwt = require("jsonwebtoken");
require("../database");

const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

const getUserPlaces = (req, res, next) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    try {
      const { id } = userData;
      const allPlaces = await Place.find({ owner: id });
      res.status(200).json(allPlaces);
    } catch (error) {
      console.error("Error retrieving user places:", error);
      next(error);
    }
  });
};

const getAllPlaces = async (req, res) => {
  const places = await Place.find();
  res.status(200).json(places);
};

const getPlaceById = async (req, res) => {
  const { id } = req.params;
  res.status(200).json(await Place.findById(id));
};

const postPlace = (req, res, next) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    try {
      const placeDoc = await Place.create({
        owner: userData.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      res.status(201).json(placeDoc);
    } catch (error) {
      console.error("Error creating place:", error);
      next(error);
    }
  });
};

const putUpdatePlace = (req, res, next) => {
  const { token } = req.cookies;
  const { id } = req.params;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    try {
      const placeDoc = await Place.findById(id);

      if (!placeDoc) {
        return res.status(404).json({ error: "Place not found" });
      }

      if (userData.id === placeDoc.owner.toString()) {
        placeDoc.set({
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });
        const newPlaceDoc = await placeDoc.save();
        res.status(200).json(newPlaceDoc);
      } else {
        res.status(403).json({ error: "Unauthorized" });
      }
    } catch (error) {
      console.error("Error updating place:", error);
      next(error);
    }
  });
};

module.exports = {
  getUserPlaces,
  getAllPlaces,
  getPlaceById,
  postPlace,
  putUpdatePlace,
};
