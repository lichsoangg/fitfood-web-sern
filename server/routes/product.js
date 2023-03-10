const middlewareController = require("../controllers/middlewareController");
const ProductController = require("../controllers/productController");
const RolePermissions = require("../utils/constants");
const multer = require("multer");
const path = require("path");
const {
  verifyToken,
  checkRole,
} = require("../controllers/middlewareController");
const router = require("express").Router();
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = "Only image files are allowed!";
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
}).single("ProductAvatar");

router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProduct);
router.post(
  "/",
  [verifyToken, checkRole(RolePermissions.Product.Add), upload],
  ProductController.addProduct
);
router.put(
  "/:productID",
  [verifyToken, checkRole(RolePermissions.Product.Update), upload],
  ProductController.updateProduct
);
router.delete(
  "/:productID",
  [verifyToken, checkRole(RolePermissions.Product.Delete)],
  ProductController.deleteProduct
);
module.exports = router;
