const router = require("express").Router();
const placeController = require("../controllers/place");

router.get("/get-user", placeController.getUserPlaces);
router.get("/get-all", placeController.getAllPlaces);
router.get("/get-id/:id", placeController.getPlaceById);
router.post("/create-places", placeController.postPlace);
router.put("/update-places/:id", placeController.putUpdatePlace);

module.exports = router;
