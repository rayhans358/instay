const router = require("express").Router();
const photoController = require("../controllers/photo");
const multer = require("multer");

const photosMiddleware = multer({ dest: "uploads" });

router.post("/upload-by-link", photoController.uploadPhotoByLink);
router.post(
  "/upload-by-file",
  photosMiddleware.array("photos", 100),
  photoController.uploadPhotoByFile
);
// router.delete("/delete-photo", photoController.deletePhoto);

module.exports = router;
