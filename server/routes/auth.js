const { checkPhoneNumber } = require("../controllers/authController");
const authController = require("../controllers/authController");
const { verifyToken } = require("../controllers/middlewareController");
const {
  checkUsernameExisted,
  checkPhoneNumberExisted,
} = require("../validators/registerValidator");
const router = require("express").Router();
router.post(
  "/register",
  [checkUsernameExisted, checkPhoneNumberExisted],
  authController.register
);
router.post("/login", authController.login);
router.get("/refresh", authController.refresh);
router.post("/check-username", authController.checkUsername);
router.post("/check-phone-number", authController.checkPhoneNumber);
router.post("/logout", verifyToken, authController.logout);
router.post("/verify-email", verifyToken, authController.verifyEmail);
router.post("/send-email-verify", verifyToken, authController.sendEmailVerify);
router.post("/reset-password", authController.resetPassword);
module.exports = router;
