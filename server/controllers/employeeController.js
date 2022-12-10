const Employee = require("../models/Employee.model")
const User = require("../models/User.model")
const RolePermissions = require("../utils/constants")
const path = require('path')
const fs = require("fs")
const employeeController = {
    getEmployees: (req, res, next) => {
        const role = req.user.Role
        const limit = req.query.limit || 5
        const page = req.query.page || 1
        const search = req.query.search || null
        const roleQuery = req.query.role || null
<<<<<<< HEAD
<<<<<<< HEAD
        const NUMBER_ROWS_OFFSET= page*limit-limit;
        const NUMBER_ROWS_FETCH_NEXT=limit;
=======
        const NUMBER_ROWS_OFFSET = page * limit - limit
        const NUMBER_ROWS_FETCH_NEXT = limit
>>>>>>> 19bb4fd (commit for merge)
        if (RolePermissions.Employee.Get.includes(role)) {
            try {
                let queriesGroup=[];
                let queryString = '';
                let offsetString = ''
                if (search) {
                    queriesGroup.push(`CONCAT(Employee.EmployeeIDEmployee.Username,'',Name,'',DATE_FORMAT(DayOfBirth, '%Y/%m/%d'),'',PhoneNumber,Role) Like '%${search}%'`)
                }
                if (roleQuery) {
                    queriesGroup.push(`Role Like '%${roleQuery}%'`)
                }
<<<<<<< HEAD
                if(queriesGroup.length>0){
                    queriesGroup.map(query=>{
                    
                        if(queryString.length>0){
                          queryString= queryString.concat('AND ',query,' ');
                        }
                        else{
                          queryString= queryString.concat('WHERE ',query,' ');
                        }
                    })
                }

                if (limit && page) {
                    offsetString=offsetString.concat(' ',` LIMIT ${NUMBER_ROWS_OFFSET},${NUMBER_ROWS_FETCH_NEXT}`)
                }
             
                Employee.getEmployees(queryString,offsetString, (err, data) => {
                    if (err) return res.status(400).json({ message: "Yêu cầu không hợp lệ" })
                    Employee.countEmployees((errCount, dataCount)=>{
                        if (errCount) return res.status(400).json({ message: "Yêu cầu không hợp lệ" })
                        const pageSize=Math.ceil(dataCount[0].NumberOfEmployees/limit);
                        data.map(item => {
                            let avatar = item?.Avatar
                            if (avatar) {
                                avatar = `${process.env.IMAGE_DATA_URL}/${item?.Avatar}`
                            }
                            return item.Avatar = avatar
                        })
                        res.status(200).json({ pageSize, data })
                    })
               
=======
        const NUMBER_ROWS_OFFSET = page * limit - limit
        const NUMBER_ROWS_FETCH_NEXT = limit
=======
                if (queriesGroup.length > 0) {
                    queriesGroup.map(query => {
>>>>>>> 19bb4fd (commit for merge)

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

<<<<<<< HEAD
                Employee.getEmployees(queryString, offsetString, (err, data) => {
                    if (err) return res.status(400).json({ message: "Yêu cầu không hợp lệ" })
                    Employee.countEmployees((errCount, dataCount) => {
                        if (errCount) return res.status(400).json({ message: "Yêu cầu không hợp lệ" })
                        const pageSize = Math.ceil(dataCount[0].NumberOfEmployees / limit)
                        data.map(item => {
                            let avatar = item?.Avatar
                            if (avatar) {
                                avatar = `${process.env.IMAGE_DATA_URL}/${item?.Avatar}`
                            }
                            return item.Avatar = avatar
                        })
                        res.status(200).json({ pageSize, data })
=======
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
>>>>>>> 864397b (feat(backend): report)
                    })
<<<<<<< HEAD
                    res.status(200).json({ pageSize, data })
>>>>>>> f7e6a00 (feat: api crud Product & ProductType & Provider & DeliveryNote & DetailDeliveryNote)
                })
=======
>>>>>>> 19bb4fd (commit for merge)

                })
            } catch (err) {
                next(err);;
            }
        }
        else {
            return res.status(401).json({ message: "Người dùng không có quyền" })
        }
    },
    updateEmployee: (req, res, next) => {
        const role = req.user.Role
        const data = req.body

        if (RolePermissions.Employee.Update.includes(role) || req.params.username === req.user.Username) {
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
                Employee.updateEmployee(data, req.params.username, (err, response) => {
                    console.log(err)
                    if (err) {
                        return res.status(400).json({ status: 400, message: err.message })
                    }
                    return res.status(200).json({ status: 200, message: "Cập nhật thành công" })
                })
            } catch (err) {
                next(err)
            }
        }
        else {
            return res.status(401).json({ message: "Người dùng không có quyền" })
        }
    },
    addEmployee: (req, res, next) => {
        const role = req.user.Role
        if (RolePermissions.Employee.Add.includes(role)) {
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
                                Employee.addEmployee(req.body, (err, response) => {
                                    console.log(err)
                                    if (err) return res.status(400).json({ message: "Yêu cầu không hợp lệ" })
                                    return res.status(200).json({ status: 200, message: "Thêm thành công" })
                                })
                            }
<<<<<<< HEAD
                        })
                    }
                })
=======
                            Employee.addEmployee(data, (err, response) => {
                                console.log(err)
                                if (err) return res.status(400).json({ message: "Yêu cầu không hợp lệ" })
                                return res.status(200).json({ status: 200, message: "Thêm thành công" })
                            })
                        }
                    })
                }
            })
>>>>>>> 864397b (feat(backend): report)

            } catch (err) {
                next(err)
            }
        }
        else {
            return res.status(401).json({ message: "Người dùng không có quyền" })
        }
    },

}

module.exports = employeeController