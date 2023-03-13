const middlewareController = require("../controllers/middlewareController");
const productTypeController = require("../controllers/productTypeController");
const RolePermissions = require("../utils/constants");

const router = require("express").Router();

router.get("/", productTypeController.getProductTypes);

module.exports = router;
