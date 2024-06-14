const router = require("express").Router();
const authRoute = require("./auth");
const photoRoute = require("./photo");
const placeRoute = require("./place");
const bookingRoute = require("./booking");

router.use("/auth", authRoute);
router.use("/photo", photoRoute);
router.use("/places", placeRoute);
router.use("/bookings", bookingRoute);

module.exports = router;
