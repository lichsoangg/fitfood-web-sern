const Employee = require("../models/Employee.model")
const User = require("../models/User.model")
const RolePermissions = require("../utils/constants")
const path = require('path')
const fs = require("fs")
const convertObjectToRowUpdateString = require("../utils/convertObjectToRowUpdateString")
const employeeController = {
    getEmployees: (req, res, next) => {
        const role = req.user.Role
        const limit = req.query.limit || 5
        const page = req.query.page || 1
        const search = req.query.search || null
        const roleQuery = req.query.role || null
        const NUMBER_ROWS_OFFSET = page * limit - limit
        const NUMBER_ROWS_FETCH_NEXT = limit

        try {
            let queriesGroup = []
            let queryString = ''
            let offsetString = ''
            if (search) {
                queriesGroup.push(`CONCAT(Employee.Username,'',Name,'',DATE_FORMAT(DayOfBirth, '%Y/%m/%d'),'',PhoneNumber,Role) Like '%${search}%'`)
            }
            if (roleQuery) {
                queriesGroup.push(`Role Like '%${roleQuery}%'`)
            }
            if (queriesGroup.length > 0) {
                queriesGroup.map(query => {

                    if (queryString.length > 0) {
                        queryString = queryString.concat('AND ', query, ' ')
                    }
                    else {
                        queryString = queryString.concat('WHERE ', query, ' ')
                    }
                })
            }

            if (limit && page) {
                offsetString = offsetString.concat(' ', ` LIMIT ${NUMBER_ROWS_OFFSET},${NUMBER_ROWS_FETCH_NEXT}`)
            }

            Employee.getEmployees(queryString, offsetString, (err, data) => {
                if (err) return res.status(400).json({ message: "Yêu cầu không hợp lệ" })
                Employee.countEmployees((errCount, dataCount) => {
                    if (errCount) return res.status(400).json({ message: "Yêu cầu không hợp lệ" })
                    const pageSize = Math.ceil(dataCount[0].NumberOfEmployees / limit)
                    data.map(item => {
                        let avatar = item?.Avatar
                        if (avatar) {
                            const originalUrl = `${req.protocol}://${req.get('host')}`
                            avatar = `${originalUrl}/images/${item?.Avatar}`
                        }
                        return item.Avatar = avatar
                    })
                    res.status(200).json({ pageSize, data })
                })

            })
        } catch (err) {
            next(err);;
        }

    },
    updateEmployee: (req, res, next) => {
        const role = req.user.Role
        const data = req.body

        if (req.params.username === req.user.Username) {
            try {
                if (req.file) {
                    Employee.getEmployeeWithUsername(req.params.username, async (err, employee) => {
                        if (err) throw err
                        if (employee[0]?.Avatar) {
                            let fileOldNameWithPath = path.join(__dirname, `../upload/images/${employee[0].Avatar}`)
                            if (fs.existsSync(fileOldNameWithPath)) {
                                fs.unlink(fileOldNameWithPath, (err) => {
                                    if (err) {
                                        throw err
                                    }
                                })
                            }
                        }
                    })

                    data["Avatar"] = req.file.filename

                }
                if (data["Avatar"]) {
                    const originalUrl = `${req.protocol}://${req.get('host')}/images/`
                    data["Avatar"] = data["Avatar"].replace(originalUrl, '')
                }
                Employee.updateEmployee(convertObjectToRowUpdateString(data), req.params.username, (err, response) => {
                    if (err) {
                        return res.status(400).json({ status: 400, message: err.message })
                    }
                    return res.status(200).json({ status: 200, message: "Cập nhật thành công" })
                })
            } catch (err) {
                next(err)
            }
        }

    },
    addEmployee: (req, res, next) => {
        try {
            User.getUserWithName(req.body.Username, (err, response) => {
                if (err) throw err
                if (response.length) return res.status(409).json({ message: "Tên tài khoản đã tồn tại" })
                else {
                    Employee.getEmployeeWithPhone(req.body.PhoneNumber, (err, response) => {
                        if (err) throw err
                        if (response.length) return res.status(409).json({ message: "Số điện thoại đã tồn tại" })
                        else {
                            const data = req.body
                            if (req.file) {
                                data["Avatar"] = req.file.filename
                            }
                            Employee.addEmployee(data, (err, response) => {
                                console.log(err)
                                if (err) return res.status(400).json({ message: "Yêu cầu không hợp lệ" })
                                return res.status(200).json({ status: 200, message: "Thêm thành công" })
                            })
                        }
                    })
                }
            })

        } catch (err) {
            next(err)
        }

    },

}

module.exports = employeeController