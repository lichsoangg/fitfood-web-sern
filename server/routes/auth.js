const authController = require("../controllers/authController");
const { verifyToken } = require("../controllers/middlewareController");

const router = require("express").Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/refresh", authController.refresh);
router.post("/checkusername", authController.checkUsername);
router.post("/checkphonenumber", authController.checkPhoneNumber);
router.post("/logout", verifyToken, authController.logout);
router.post("/verify-email", verifyToken, authController.verifyEmail);
router.post("/send-email-verify", verifyToken, authController.sendEmailVerify);
router.post("/reset-password",authController.resetPassword);
module.exports = router;