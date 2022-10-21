const bcrypt = require("bcrypt");
const User = require("../models/User.model.js");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError.js");
const { signAccessToken, signRefreshToken } = require("../utils/jwt_service.js");
const client = require("../utils/connect_redis.js");
const Customer = require("../models/Customer.model.js");
const authController = {
    //REGISTER
    register: async (req, res, next) => {
        try {
            const { username, password, ...otherInfo } = req.body;
            if (!username || !password) return res.json(createError(400, "Bad request"));
            User.getUserWithName(username, async (err, data) => {
                if (err) return res.json(createError(400, "Bad request"));
                if (data.length) return res.json(createError(409, "Username already registered"));

                const salt = await bcrypt.genSalt(10);
                const passwordHashed = await bcrypt.hash(req.body.password, salt);
                Customer.postCustomer({ ...req.body, password: passwordHashed }, (err, data) => {
                    if (err) {
                        return res.json(createError(400, err));
                    }
                    const accessToken = signAccessToken(username, false);
                    return res.json({ username, accessToken, status: 200 });
                });
            }
            );

        } catch (err) {
            next(err);
        }
    },
    //LOGIN
    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) return res.json(createError(400, "Bad request"));
            User.getUserWithName(username, async (err, data) => {
                if (data.length) {
                    const validPassword = await bcrypt.compare(password, data[0].Password);
                    if (!validPassword) return res.json(createError(400, "User and password is not correct"));
                    const { Password, ...otherInfo } = data[0];
                    const accessToken = signAccessToken(username, data[0].IsAdmin);
                    signRefreshToken(username, data[0].IsAdmin, res);
                    return res.json({ ...otherInfo, accessToken, status: 200 });
                } else {
                    return res.json(createError(400, "User and password is not correct"));
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
            if (!refreshTokenClient) return res.json(createError(403, "Token not valid"));
            jwt.verify(refreshTokenClient, process.env.REFRESH_SECRET_KEY, async (err, user) => {
                if (err) return res.json(createError(401, "You're not authenticated"));
                const refreshTokenServer = await client.get(user.Username.toString());
                if (refreshTokenServer !== refreshTokenClient) return res.json(createError(404, "Incorrect Token"));
                const newAccessToken = signAccessToken(user.Username, user.IsAdmin);
                signRefreshToken(user.Username, user.IsAdmin, res);
                return res.json({ status: 200, accessToken: newAccessToken });
            });
        } catch (err) {
            next(err);
        }
    },

    //LOG OUT
    logout: (req, res, next) => {
        try {
            res.clearCookie("refreshToken");
            client.del(req.user.Username);
            return res.json({ status: 200, message: "Logout Successfully" });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = authController;