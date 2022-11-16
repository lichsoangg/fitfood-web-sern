const bcrypt = require("bcrypt");
const User = require("../models/User.model.js");
const jwt = require("jsonwebtoken");
const { signAccessToken, signRefreshToken } = require("../utils/jwt_service.js");
const client = require("../utils/connect_redis.js");
const Customer = require("../models/Customer.model.js");
const authController = {
    //REGISTER
    register: async (req, res, next) => {
        try {
            const { username, password, ...otherInfo } = req.body;
            if (!username || !password) return res.status(400).json( "Yêu cầu không hợp lệ");
            User.getUserWithName(username, async (err, data) => {
                if (err) return res.status(400).json({message:"Yêu cầu không hợp lệ"});
                if (data.length) return res.status(409).json({message:"Tên tài khoản đã tồn tại"});
                const salt = await bcrypt.genSalt(10);
                const passwordHashed = await bcrypt.hash(req.body.password, salt);
                Customer.postCustomer({ ...req.body, password: passwordHashed }, (err, data) => {
                    if (err) {
                        return res.status(400).json( err);
                    }
                    const accessToken = signAccessToken(username, false);
                    signRefreshToken(username, false, res);
                    return res.status(201).json({ username, accessToken, status: 201 });
                });
            }
            );

        } catch (err) {
            next(err);
        }
    },

    //CHECK USERNAME EXIST
    checkUsername: async (req,res,next)=>{
        try {
            const { username } = req.body;
            User.getUserWithName(username, async (err, data) => {
                if (err) return res.status(400).json({message:"Yêu cầu không hợp lệ"});
                if (data.length) return res.status(409).json({message:"Tên tài khoản đã được đăng ký"});
                return res.status(200).json({});
            })
        } catch (err) {
            next(err)
        }
    },
    //CHECK PHONE NUMBER EXIST
    checkPhoneNumber: async(req,res,next)=>{
        try {
            const { phoneNumber } = req.body;
            Customer.getCustomerWithPhone(phoneNumber, async (err, data) => {
                if (err) return res.status(400).json({message:"Yêu cầu không hợp lệ"});
                if (data.length) return res.status(409).json({message:"Số điện thoại đã được đăng ký"});
                return res.status(200).json({});
            })
        } catch (err) {
            next(err)
        }
    },
    //LOGIN
    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) return res.status(400).json({message:"Yêu cầu không hợp lệ"});
            User.getUserWithName(username, async (err, data) => {
                if (data.length) {
                    const validPassword = await bcrypt.compare(password, data[0].Password);
                    if (!validPassword) return res.status(401).json({message:"Tài khoản hoặc mật khẩu không đúng"});
                    const { Password, ...otherInfo } = data[0];
                    const accessToken = signAccessToken(username, data[0].IsAdmin);
                    signRefreshToken(username, data[0].IsAdmin, res);
                    return res.status(200).json({ ...otherInfo, accessToken, status: 200 });
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
            if (!refreshTokenClient) return res.status(403).json({message:"Không có token"});
            jwt.verify(refreshTokenClient, process.env.REFRESH_SECRET_KEY, async (err, user) => {
                if (err) return res.status(401).json({message:"Bạn không có quyền truy cập"});
                const refreshTokenServer = await client.get(user.Username.toString());
                if (refreshTokenServer !== refreshTokenClient) return res.status(404).json({message:"Token không hợp lệ"});
                const newAccessToken = signAccessToken(user.Username, user.IsAdmin);
                signRefreshToken(user.Username, user.IsAdmin, res);
                return res.status(200).json({ status: 200, accessToken: newAccessToken });
            });
        } catch (err) {
            next(err);
        }
    },

    //LOG OUT
    logout:async (req, res, next) => {
        try {
            client.del(req.user.Username);
            res.clearCookie("refreshToken")
            return res.status(200).json({ status: 200, message: "Logout Successfully" });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = authController;