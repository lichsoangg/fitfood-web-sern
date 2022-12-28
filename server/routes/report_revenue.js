const ReportRevenueController = require("../controllers/ReportRevenueController")

const router = require("express").Router()

router.get('/', ReportRevenueController.getReportRevenue)
router.get('/employees/', ReportRevenueController.getEmployeesRevenue)
router.get('/customers/', ReportRevenueController.getCustomersRevenue)
router.get('/products/', ReportRevenueController.getProductsRevenue)

module.exports = router