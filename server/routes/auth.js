const authController = require("../controllers/authController");
const { verifyToken } = require("../controllers/middlewareController");

const router = require("express").Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/refresh", authController.refresh);
router.post("/checkusername", authController.checkUsername);
router.post("/checkphonenumber",authController.checkPhoneNumber);
router.post("/logout", authController.logout);

module.exports= router;