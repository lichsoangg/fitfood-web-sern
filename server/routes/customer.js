const customerController = require("../controllers/customerController");
const middlewareController = require("../controllers/middlewareController");
const multer = require("multer");
const path = require('path');
const router = require("express").Router();
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = "Only image files are allowed!";
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
}).single("Avatar");

router.put("/update", [middlewareController.verifyToken, upload],customerController.updateCustomer);

module.exports=router;