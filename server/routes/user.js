const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

const router = require("express").Router();

router.get("/getusers", middlewareController.verifyToken, userController.getAllUsers);
router.get("/me", middlewareController.verifyToken, userController.getMe); 


module.exports = router;