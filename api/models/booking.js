const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookingSchema = new Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Place",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  price: Number,
});

const BookingModel = model("Booking", bookingSchema);

module.exports = BookingModel;
