const middlewareController = require("../controllers/middlewareController")
const ProductController = require("../controllers/productController")
const RolePermissions = require("../utils/constants")

const router = require("express").Router()


router.get("/", ProductController.getProducts)
router.post("/", [middlewareController.verifyToken, middlewareController.checkRole(RolePermissions.Product.Add)], ProductController.addProduct)
router.put("/:productID", [middlewareController.verifyToken, middlewareController.checkRole(RolePermissions.Product.Update)], ProductController.updateProduct)
router.delete("/:productID", [middlewareController.verifyToken, middlewareController.checkRole(RolePermissions.Product.Delete)], ProductController.deleteProduct)
module.exports = router