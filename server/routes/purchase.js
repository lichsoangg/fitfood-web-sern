const middlewareController = require("../controllers/middlewareController");
const purchaseController = require("../controllers/purchaseController");

const router = require("express").Router();

router.get(
  "/",
  middlewareController.verifyToken,
  purchaseController.getPurchase
);
router.post(
  "/add-to-cart",
  middlewareController.verifyToken,
  purchaseController.addToCart
);
router.put(
  "/update-cart",
  middlewareController.verifyToken,
  purchaseController.updateCart
);
router.delete(
  "/",
  middlewareController.verifyToken,
  purchaseController.deleteCart
);
router.post(
  "/buy-products",
  middlewareController.verifyToken,
  purchaseController.buyProducts
);
module.exports = router;
