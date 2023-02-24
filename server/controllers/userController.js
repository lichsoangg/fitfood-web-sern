const User = require("../models/User.model");
const bcrypt = require("bcrypt");
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
        }
      });
    } catch (err) {
      next(err);
    }
  },

  // Update password
  updatePassword: (req, res, next) => {
    const { password, newPassword } = req.body;
    const { Username } = req.user;
    try {
      User.getUserWithName(Username, async (err, data) => {
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
