const employeeController = require("../controllers/employeeController")
const middlewareController = require("../controllers/middlewareController")
const router = require("express").Router()
const multer = require("multer")
const path = require('path')
const RolePermissions = require("../utils/constants")
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = "Only image files are allowed!"
            return cb(new Error('Only image files are allowed!'), false)
        }
        cb(null, true)
    }
}).single("EmployeeAvatar")
router.get("/", [middlewareController.verifyToken, middlewareController.checkRole(RolePermissions.Employee.Get)], employeeController.getEmployees)
router.put("/:username", [middlewareController.verifyToken, middlewareController.checkRole(RolePermissions.Employee.Update), upload], employeeController.updateEmployee)
router.post("/add", [middlewareController.verifyToken, middlewareController.checkRole(RolePermissions.Employee.Add), upload], employeeController.addEmployee)

module.exports = router