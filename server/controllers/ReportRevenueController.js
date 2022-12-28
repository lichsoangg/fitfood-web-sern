const ReportRevenue = require("../models/ReportRevenue.model")

const ReportRevenueController = {
    getReportRevenue: (req, res, next) => {
        const dateStart = req.query.date_start
        const dateEnd = req.query.date_end
        const employeeID = req.query.employee || null
        const customerID = req.query.customer || null
        const productID = req.query.product || null


        ReportRevenue.getReportRevenue({ dateStart, dateEnd, employeeID, customerID, productID }, (err, response) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            const revenue = response[0]?.Revenue
            return res.status(200).json({ revenue })
        })
    },
    getEmployeesRevenue: (req, res, next) => {
        const dateStart = req.query.date_start
        const dateEnd = req.query.date_end
        ReportRevenue.getEmployeesRevenue({ dateStart, dateEnd }, (err, data) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ data })
        })
    },
    getCustomersRevenue: (req, res, next) => {
        const dateStart = req.query.date_start
        const dateEnd = req.query.date_end
        ReportRevenue.getCustomersRevenue({ dateStart, dateEnd }, (err, data) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ data })
        })
    },
    getProductsRevenue: (req, res, next) => {
        const dateStart = req.query.date_start
        const dateEnd = req.query.date_end
        ReportRevenue.get({ dateStart, dateEnd }, (err, data) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ data })
        })
    },
}

module.exports = ReportRevenueController