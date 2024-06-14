const router = require("express").Router();
const bookingController = require("../controllers/booking");

router.get("/get-all", bookingController.getAllBookings);
router.get("/get-id/:id", bookingController.getBookingById);
router.post("/create-bookings", bookingController.postBooking);

module.exports = router;
