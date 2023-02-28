const bcrypt = require("bcrypt");
const User = require("../models/User.model.js");
const jwt = require("jsonwebtoken");
const {
  signAccessToken,
  signRefreshToken,
} = require("../utils/jwt_service.js");
const client = require("../utils/connect_redis.js");
const randomNumberVerifyEmail = require("../utils/randomNumberVerifyEmail.js");
const nodemailer = require("nodemailer");
const stringVerifyEmailTemplate = require("../utils/stringEmailTemplate.js");
const checkFieldExisted = require("../utils/checkFieldExisted");

const authController = {
  //REGISTER
  register: async (req, res, next) => {
    try {
      const data = req.body;
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(data.password, salt);
      data.password = passwordHashed;
      User.addUser(data, (err, response) => {
        if (err) {
          return res.status(400).json({ message: err.message, status: 400 });
        }
        const { username, role } = data;
        const AccessToken = signAccessToken(username, role);
        signRefreshToken(username, role, res);
        return res.status(201).json({
          data: {
            Username: username,
            IsValid: 1,
            AccessToken,
          },
          status: 201,
        });
      });
    } catch (err) {
      next(err);
    }
  },

  //CHECK USERNAME EXIST
  checkUsername: async (req, res, next) => {
    if (req.body.username) {
      const isUsed = await checkFieldExisted(
        req.body.username,
        "Username",
        "User"
      );
      if (isUsed) {
        res
          .status(409)
          .json({ status: 409, message: "Username đã được sử dụng" });
      } else {
        return res
          .status(200)
          .json({ status: 200, message: "Username có thể sử dụng" });
      }
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "Thiếu trường dữ liệu số điện thoại" });
    }
  },
  //CHECK PHONE NUMBER EXIST
  checkPhoneNumber: async (req, res, next) => {
    if (req.body.PhoneNumber) {
      const isUsed = await checkFieldExisted(
        req.body.PhoneNumber,
        "phoneNumber",
        "User"
      );
      if (isUsed) {
        res
          .status(409)
          .json({ status: 409, message: "Số điện thoại đã được sử dụng" });
      } else {
        return res
          .status(200)
          .json({ status: 200, message: "Số điện thoại có thể sử dụng" });
      }
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "Thiếu trường dữ liệu số điện thoại" });
    }
  },
  //LOGIN
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        return res.status(400).json({ message: "Yêu cầu không hợp lệ" });
      User.getUserWithUsername(username, async (err, data) => {
        if (err)
          return res.status(400).json({ message: "Yêu cầu không hợp lệ" });
        if (data?.length) {
          const validPassword = await bcrypt.compare(
            password,
            data[0].Password
          );
          if (!validPassword)
            return res
              .status(401)
              .json({ message: "Tài khoản hoặc mật khẩu không đúng" });
          const { Password, ...otherInfo } = data[0];
          const AccessToken = signAccessToken(username, data[0].Role);
          signRefreshToken(username, data[0].Role, res);
          //change url for avatar
          let avatar = data[0]?.Avatar;
          if (avatar) {
            const originalUrl = `${req.protocol}://${req.get("host")}`;
            avatar = `${originalUrl}/images/${item?.Avatar}`;
          }
          return res.status(200).json({
            data: {
              ...otherInfo,
              Avatar: avatar,
              AccessToken: AccessToken,
            },
            status: 200,
          });
        } else {
          return res
            .status(401)
            .json({ message: "Tài khoản hoặc mật khẩu không đúng" });
        }
      });
    } catch (err) {
      next(err);
    }
  },

  //REFRESH
  refresh: (req, res, next) => {
    try {
      const refreshTokenClient = req.cookies.refreshToken;
      if (!refreshTokenClient)
        return res.status(403).json({ message: "Không có token" });
      jwt.verify(
        refreshTokenClient,
        process.env.REFRESH_SECRET_KEY,
        async (err, user) => {
          if (err)
            return res
              .status(401)
              .json({ message: "Bạn không có quyền truy cập" });
          const refreshTokenServer = await client.get(user.Username.toString());
          if (refreshTokenServer !== refreshTokenClient)
            return res.status(404).json({ message: "Token không hợp lệ" });
          const newAccessToken = signAccessToken(user.Username, user.Role);

          signRefreshToken(user.Username, user.Role, res);
          return res
            .status(200)
            .json({ status: 200, data: { AccessToken: newAccessToken } });
        }
      );
    } catch (err) {
      next(err);
    }
  },

  //LOG OUT
  logout: async (req, res, next) => {
    try {
      client.del(req.user.Username);
      res.clearCookie("refreshToken");
      return res
        .status(200)
        .json({ status: 200, message: "Logout Successfully" });
    } catch (err) {
      next(err);
    }
  },
  //Verify Email
  verifyEmail: async (req, res, next) => {
    const { code: codeClient } = req.body;
    const username = req.user.Username;
    const codeServer = await client.get(`${username.toString()}-verify-email`);
    if (Number(codeClient) === Number(codeServer)) {
      User.updateActive(username, (err, response) => {
        if (err)
          return res
            .status(400)
            .json({ status: 400, message: "Yêu cầu không hợp lệ" });
        return res
          .status(200)
          .json({ status: 200, message: "Kích hoạt tài khoản thành công" });
      });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "Mã xác thực không đúng" });
    }
  },
  //sendVerifyEmail
  sendEmailVerify: async (req, res, next) => {
    const username = req.user.Username;
    const randomNumber = randomNumberVerifyEmail(username);

    //transporter config mail server
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    //content email

    var mainOptions = {
      from: "Fitfood Company",
      to: username,
      subject: "Xác thực tài khoản Fitfood",
      text: "Fitfood gửi đến bạn mã code xác thực",
      html: stringVerifyEmailTemplate(
        "Fitfood Company",
        "Xác thực Email",
        "Mã xác thực là",
        "Mã xác thực có thời hạn trong vòng 10 phút.",
        randomNumber
      ),
    };
    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        return res.status(400).json({ status: 400, message: err.message });
      } else {
        return res
          .status(200)
          .json({ status: 200, message: "Gửi Email thành công!" });
      }
    });
  },
  // Reset Password
  resetPassword: (req, res, next) => {
    const { Username } = req.body;
    const randomNumber = Math.floor(Math.random() * 899999 + 100000);
    //transporter config mail server
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    var mainOptions = {
      from: "Fitfood Company",
      to: Username,
      subject: "Khôi phục mật khẩu Fitfood",
      text: "Fitfood gửi đến mật khẩu đã được khôi phục",
      html: stringVerifyEmailTemplate(
        "Fitfood Company",
        "Khôi phục mật khẩu",
        "Mật khẩu mới là",
        "Vui lòng không cung cấp mật khẩu cho bất cứ ai!.",
        randomNumber
      ),
    };

    User.getUserWithUsername(Username, async (err, data) => {
      if (!err) {
        if (data.length > 0) {
          const salt = await bcrypt.genSalt(10);
          const passwordHashed = await bcrypt.hash(
            randomNumber.toString(),
            salt
          );
          User.updatePassword({ Username, passwordHashed }, (err, data) => {
            if (!err) {
              transporter.sendMail(mainOptions, function (err, info) {
                if (!err) {
                  return res.status(200).json({
                    status: 200,
                    message:
                      "Khôi phục mật khẩu thành công.Bạn vui lòng kiểm tra Email",
                  });
                } else {
                  return res
                    .status(400)
                    .json({ status: 400, message: err.message });
                }
              });
            } else {
              return res
                .status(400)
                .json({ status: 400, message: err.message });
            }
          });
        } else {
          return res
            .status(400)
            .json({ status: 400, message: "Email chưa được đăng ký" });
        }
      } else {
        return res.status(400).json({ status: 400, message: err.message });
      }
    });
  },
};

module.exports = authController;
