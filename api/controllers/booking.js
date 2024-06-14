const Booking = require("../models/booking");
const jwt = require("jsonwebtoken");
require("../database");

const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
      resolve(userData);
    });
  });
}

const getAllBookings = async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const allBookings = await Booking.find({ user: userData.id }).populate(
    "place"
  );
  res.status(200).json(allBookings);
};

const getBookingById = async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const bookingId = await Booking.findOne({
    user: userData.id,
  }).populate("place");
  res.status(200).json(bookingId);
};

const postBooking = async (req, res, next) => {
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phoneNumber, price } =
    req.body;

  try {
    const newBooking = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phoneNumber,
      price,
      user: userData.id,
    });
    res.status(201).json(newBooking);
  } catch (err) {
    console.error("Error creating booking:", err);
    next(err);
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  postBooking,
};
