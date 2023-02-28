const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const e = require("express");
const path = require("path");
const fs = require("fs");

const nodemailer = require("nodemailer");
const stringVerifyEmailTemplate = require("../utils/stringEmailTemplate");
const _ = require("lodash");
const convertObjectToRowUpdateString = require("../utils/convertObjectToRowUpdateString");
const userController = {
  //Get all users
  getAllUsers: (req, res, next) => {
    try {
      User.getUsers((err, data) => {
        if (!err) {
          res.status(200).json({ data });
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

  // Get me
  getMe: (req, res, next) => {
    try {
      User.getUserWithUsername(req.user.Username, (err, response) => {
        const dataUser = response[0];
        if (!err) {
          let avatar = dataUser?.Avatar;
          if (avatar) {
            const originalUrl = `${req.protocol}://${req.get("host")}`;
            avatar = `${originalUrl}/images/${item?.Avatar}`;
          }
          res.status(200).json({
            data: _.omit({ ...dataUser, Avatar: avatar }, "Password"),
            status: 200,
          });
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
          if (err) {
            return res.status(400).json({ status: 400, message: err.message });
          }
          return res
            .status(200)
            .json({ status: 200, message: "Cập nhật thành công" });
        }
      );
    } catch (err) {
      next(err);
    }
  },
  // Update password
  updatePassword: (req, res, next) => {
    const { password, newPassword } = req.body;
    const { Username } = req.user;
    try {
      User.getUserWithUsername(Username, async (err, data) => {
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
