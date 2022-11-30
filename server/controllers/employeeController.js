const Employee = require("../models/Employee.model");
const User = require("../models/User.model");
const RolePermissions = require("../utils/constants");
const path = require('path');
const fs = require("fs");
const employeeController = {
    getEmployees: (req, res, next) => {
        const role = req.user.Role;
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        if (RolePermissions.Employee.Get.includes(role)) {
            try {
                Employee.getEmployees((err, data) => {
                    const pageSize=Math.ceil(data.length/limit);
                    data=data.splice(page*limit-limit, limit);
                    if (err) return res.status(400).json({ message: "Yêu cầu không hợp lệ" });
                    res.status(200).json({pageSize, data });
                });
            } catch (err) {
                next(err);;
            }
        }
        else {
            return res.status(401).json({ message: "Người dùng không có quyền" });
        }
    },
    updateEmployee: (req, res, next) => {
        const role = req.user.Role;
        const data = req.body;
        if (RolePermissions.Employee.Update.includes(role) || req.params.username === req.user.Username) {
            try {
                if (req.file) {
                    Employee.getEmployeeWithUsername(req.params.username, async (err, employee) => {
                        if (err) throw err;
                        if (employee[0]?.Avatar) {
                            let fileOldNameWithPath = path.join(__dirname, `../upload/images/${employee[0].Avatar}`);
                            if (fs.existsSync(fileOldNameWithPath)) {
                                fs.unlink(fileOldNameWithPath, (err) => {
                                    if (err) {
                                        throw err;
                                    }
                                });
                            }
                        }
                    });
                    data["Avatar"] = req.file.filename;
                }
                data["Avatar"]=data["Avatar"].replace(process.env.IMAGE_DATA_URL,'');

                Employee.updateEmployee(data, req.params.username, (err, response) => {
                    if(err){
                        return res.status(400).json({status:400,message:err.message});
                    }
                    return res.status(200).json({ status: 200, message: "Cập nhật thành công" });
                });
            } catch (err) {
                next(err);
            }
        }
        else {
            return res.status(401).json({ message: "Người dùng không có quyền" });
        }
    },
    addEmployee: (req, res, next) => {
        const role = req.user.Role;
        if (RolePermissions.Employee.Add.includes(role)) {
            try {
                User.getUserWithName(req.body.Username, (err, response) => {
                    if (err) throw err;
                    if (response.length) return res.status(409).json({ message: "Tên tài khoản đã tồn tại" });
                    else {
                        Employee.getEmployeeWithPhone(req.body.PhoneNumber, (err, response) => {
                            if (err) throw err;
                            if (response.length) return res.status(409).json({ message: "Số điện thoại đã tồn tại" });
                            else {
                                const data = req.body;
                                if (req.file) {
                                    data["Avatar"] = req.file.filename;
                                }
                                Employee.addEmployee(req.body, (err, response) => {
                                    if (err) return res.status(400).json({ message: "Yêu cầu không hợp lệ" });
                                    return res.status(200).json({ status: 200, message: "Thêm thành công" });
                                });
                            }
                        });
                    }
                });

            } catch (err) {
                next(err);
            }
        }
        else {
            return res.status(401).json({ message: "Người dùng không có quyền" });
        }
    }
};

module.exports = employeeController;