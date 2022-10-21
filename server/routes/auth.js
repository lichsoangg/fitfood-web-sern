const authController = require("../controllers/authController");
const { verifyToken } = require("../controllers/middlewareController");

const router = require("express").Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", verifyToken, authController.logout);
module.exports = router;