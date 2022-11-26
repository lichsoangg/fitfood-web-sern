const bcrypt = require("bcrypt");
const User = require("../models/User.model.js");
const jwt = require("jsonwebtoken");
const { signAccessToken, signRefreshToken } = require("../utils/jwt_service.js");
const client = require("../utils/connect_redis.js");
const Customer = require("../models/Customer.model.js");
const randomNumberVerifyEmail = require("../utils/randomNumberVerifyEmail.js");
const nodemailer = require('nodemailer');
const stringVerifyEmailTemplate = require("../utils/stringEmailTemplate.js");
const authController = {
  //REGISTER
  register: async (req, res, next) => {
    try {
      const { username, password, ...otherInfo } = req.body;
      if (!username || !password) return res.status(400).json("Yêu cầu không hợp lệ");
      User.getUserWithName(username, async (err, data) => {
        if (err) return res.status(400).json({ message: "Yêu cầu không hợp lệ" });
        if (data.length) return res.status(409).json({ message: "Tên tài khoản đã tồn tại" });
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(req.body.password, salt);

        Customer.postCustomer({ ...req.body, password: passwordHashed }, (err, data) => {
          if (err) {
            return res.status(400).json(err);
          }

          const accessToken = signAccessToken(username, `Customer`);
          signRefreshToken(username, false, res);
          return res.status(201).json({ username, IsValid: 0, accessToken, status: 201 });
        });
      }
      );

    } catch (err) {
      next(err);
    }
  },

  //CHECK USERNAME EXIST
  checkUsername: async (req, res, next) => {
    try {
      const { username } = req.body;
      User.getUserWithName(username, async (err, data) => {
        if (err) return res.status(400).json({ message: "Yêu cầu không hợp lệ" });
        if (data.length) return res.status(409).json({ message: "Tên tài khoản đã được đăng ký" });
        return res.status(200).json({});
      });
    } catch (err) {
      next(err);
    }
  },
  //CHECK PHONE NUMBER EXIST
  checkPhoneNumber: async (req, res, next) => {
    try {
      const { phoneNumber, username } = req.body;
      Customer.getCustomerWithPhone(phoneNumber, async (err, data) => {
        if (err) return res.status(400).json({ message: "Yêu cầu không hợp lệ" });
        if (data.length) {

          if (data[0].Username !== username) {
            return res.status(409).json({ message: "Số điện thoại đã được đăng ký" });
          }

        }
        return res.status(200).json({});
      });
    } catch (err) {
      next(err);
    }
  },
  //LOGIN
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) return res.status(400).json({ message: "Yêu cầu không hợp lệ" });
      User.getUserWithName(username, async (err, data) => {
        if (err) return res.status(400).json({ message: "Yêu cầu không hợp lệ" });
        if (data?.length) {
          const validPassword = await bcrypt.compare(password, data[0].Password);
          if (!validPassword) return res.status(401).json({ message: "Tài khoản hoặc mật khẩu không đúng" });
          const { Password, ...otherInfo } = data[0];
          const accessToken = signAccessToken(username, data[0].Role);
          signRefreshToken(username, data[0].Role, res);
          return res.status(200).json({ ...otherInfo, IsValid: data[0].IsValid, accessToken, status: 200 });
        } else {
          return res.status(401).json({ message: "Tài khoản hoặc mật khẩu không đúng" });
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
      if (!refreshTokenClient) return res.status(403).json({ message: "Không có token" });
      jwt.verify(refreshTokenClient, process.env.REFRESH_SECRET_KEY, async (err, user) => {
        if (err) return res.status(401).json({ message: "Bạn không có quyền truy cập" });
        const refreshTokenServer = await client.get(user.Username.toString());
        if (refreshTokenServer !== refreshTokenClient) return res.status(404).json({ message: "Token không hợp lệ" });
        const newAccessToken = signAccessToken(user.Username, user.Role);
        signRefreshToken(user.Username, user.Role, res);
        return res.status(200).json({ status: 200, accessToken: newAccessToken });
      });
    } catch (err) {
      next(err);
    }
  },

  //LOG OUT
  logout: async (req, res, next) => {
    try {
      client.del(req.user.Username);
      res.clearCookie("refreshToken");
      return res.status(200).json({ status: 200, message: "Logout Successfully" });
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
        if (err) return res.status(400).json({ status: 400, message: "Yêu cầu không hợp lệ" });
        return res.status(200).json({ status: 200, message: "Kích hoạt tài khoản thành công" });
      });

    }
    else {
      return res.status(401).json({ status: 401, message: "Mã xác thực không đúng" });

    }
  },
  //sendVerifyEmail
  sendEmailVerify: async (req, res, next) => {
    const username = req.user.Username;
    const randomNumber = randomNumberVerifyEmail(username);

    //transporter config mail server
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    //content email

    var mainOptions = {
      from: 'Fitfood Company',
      to: username,
      subject: 'Xác thực tài khoản Fitfood',
      text: 'Fitfood gửi đến bạn mã code xác thực',
      html: stringVerifyEmailTemplate(randomNumber),
    };
    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        return res.status(400).json({ status: 400, message: err.message });
      } else {
        return res.status(200).json({ status: 200, message: "Gửi Email thành công!" });
      }
    });
  }
};

module.exports = authController;