const User = require("../models/User.model");
const bcrypt = require("bcrypt");
<<<<<<< HEAD
const e = require("express");
const nodemailer = require("nodemailer");
const stringVerifyEmailTemplate = require("../utils/stringEmailTemplate");

const userController = {
  //Get all users
  getAllUsers: (req, res, next) => {
    try {
      User.getUsers((err, data) => {
        if (!err) {
          res.status(200).json({ data });
=======
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const stringVerifyEmailTemplate = require("../utils/stringEmailTemplate");
const convertObjectToRowUpdateString = require("../utils/convertObjectToRowUpdateString");

const userController = {
  // Get me
  getMe: (req, res, next) => {
    try {
      User.getUserWithUsername(req.user.Username, (err, response) => {
        const dataUser = response[0];
        if (!err) {
          let avatar = dataUser?.Avatar;
          if (avatar) {
            const originalUrl = `${req.protocol}://${req.get("host")}`;
            avatar = `${originalUrl}/images/${dataUser?.Avatar}`;
          }
          res.status(200).json({ ...dataUser, Avatar: avatar });
>>>>>>> 9b1aead (chore: provide data for database)
        } else {
          const err = new Error("Yêu cầu không hợp lệ");
          err.status = 400;
          return err;
        }
      });
    } catch (err) {
      next(err);
    }
  },
<<<<<<< HEAD

<<<<<<< HEAD
  // Get me
  getMe: (req, res, next) => {
    try {
      User.getUserInfo(req.user.Username, (err, response) => {
        const dataUser = response[0];
        if (!err) {
          let avatar = dataUser?.Avatar;
          if (avatar) {
            avatar = `${process.env.IMAGE_DATA_URL}${dataUser?.Avatar}`;
          }
          res.status(200).json({ ...dataUser, Avatar: avatar });
        } else {
          const err = new Error("Yêu cầu không hợp lệ");
          err.status = 400;
          return err;
=======
    // Get me
    getMe: (req, res, next) => {
        try {
            User.getUserInfo(req.user.Username, (err, data) => {
                const dataUser = data[0][0] || data[1][0]
                if (!err) {
                    let avatar = dataUser?.Avatar
                    if (avatar) {
                        const originalUrl = `${req.protocol}://${req.get('host')}`
                        avatar = `${originalUrl}/images/${item?.Avatar}`
                    }
                    res.status(200).json({ ...dataUser, Avatar: avatar })
                } else {
                    const err = new Error("Yêu cầu không hợp lệ")
                    err.status = 400
                    return err
                }
            })
        } catch (err) {
            next(err)
>>>>>>> 864397b (feat(backend): report)
        }
      });
=======
  // Update User
  updateUser: (req, res, next) => {
    const role = req.user.Role;
    const data = req.body;
    try {
      if (req.file) {
        User.getUserWithUsername(req.user.Username, async (err, response) => {
          if (err) throw err;
          const userData = response[0];
          if (userData && userData?.Avatar) {
            let fileOldNameWithPath = path.join(
              __dirname,
              `../upload/images/${userData.Avatar}`
            );
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
      if (data["Avatar"]) {
        const originalUrl = `${req.protocol}://${req.get("host")}/images/`;
        data["Avatar"] = data["Avatar"].replace(originalUrl, "");
      }
      User.updateUser(
        convertObjectToRowUpdateString(data),
        req.user.Username,
        (err, response) => {
          console.log(err);
          if (err) {
            return res.status(400).json({ status: 400, message: err.message });
          }
          return res
            .status(200)
            .json({ status: 200, message: "Cập nhật thành công" });
        }
      );
>>>>>>> 9b1aead (chore: provide data for database)
    } catch (err) {
      next(err);
    }
  },
<<<<<<< HEAD

=======
>>>>>>> 9b1aead (chore: provide data for database)
  // Update password
  updatePassword: (req, res, next) => {
    const { password, newPassword } = req.body;
    const { Username } = req.user;
    try {
<<<<<<< HEAD
      User.getUserWithName(Username, async (err, data) => {
=======
      User.getUserWithUsername(Username, async (err, data) => {
>>>>>>> 9b1aead (chore: provide data for database)
        if (!err) {
          const validPassword = await bcrypt.compare(
            password,
            data[0].Password
          );
          if (!validPassword)
            return res.status(401).json({ message: "Mật khẩu không đúng" });
          else {
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(newPassword, salt);
            User.updatePassword({ Username, passwordHashed }, (err, data) => {
              if (!err) {
                return res
                  .status(200)
                  .json({ status: 200, message: "Đổi mật khẩu thành công" });
              } else {
                return res
                  .status(400)
                  .json({ status: 400, message: "Yêu cầu không hợp lệ" });
              }
            });
          }
        } else {
          return res
            .status(400)
            .json({ status: 400, message: "Yêu cầu không hợp lệ" });
        }
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userController;
