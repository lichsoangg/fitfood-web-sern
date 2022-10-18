const bcrypt = require("bcrypt");
const User = require("../models/User.model.js");
const jwt = require("jsonwebtoken");
const db = require("../utils/connect_mysql");
const createError = require("../utils/createError.js");
const authController = {
    //REGISTER
    register: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) return res.json(createError(400, "Bad request"));
            User.getUserWithName(username, async (err, data) => {
                if (err) return res.json(createError(400, "Bad request"));
                if (data.length) return res.json(createError(409, "Username already registered"));

                const salt = await bcrypt.genSalt(10);
                const passwordHashed = await bcrypt.hash(req.body.password, salt);

                User.postUser([username, password], (err, data) => {
                    if (err) return res.json(createError(400, "Bad request"));
                    else {
                        const accessToken = jwt.sign({
                            id: data.insertId,
                            admin: false,
                        }, process.env.ACCESS_SECRET_KEY, { expiresIn: "30s" });
                        return res.json({ username, accessToken, status: 200 });
                    }
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
                    const accessToken = jwt.sign({
                        id: data.ID,
                        admin: data.IsAdmin,
                    }, process.env.ACCESS_SECRET_KEY, { expiresIn: "30s" });
                    return res.json({ ...otherInfo, accessToken, status: 200 });
                } else {
                    return res.json(createError(400, "User and password is not correct"));
                }
            });

        } catch (err) {
            next(err);
        }
    }
};

module.exports = authController;