const router = require("express").Router();
const authController = require("../controllers/auth");

router.get("/test", authController.test);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authController.profile);
router.post("/logout", authController.logout);

module.exports = router;
