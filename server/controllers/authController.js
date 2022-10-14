const bcrypt = require("bcrypt");
const createError = require("http-errors");
const User = require("../models/User.model.js");
const jwt = require("jsonwebtoken");

const authController = {
    //REGISTER
    register: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) throw createError.BadRequest();

            const isExisted = await User.findOne({
                username: username
            });
            if (isExisted) throw createError.Conflict(`${username} has been registered`);
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(req.body.password, salt);

            const newUser = new User({
                username: req.body.username,
                password: passwordHashed,
            });
            const user = await newUser.save();
            const { password: passwordTemp, isAdmin, ...otherDetails } = user._doc;
            const accessToken = jwt.sign({
                id: user._id,
                admin: user.isAdmin
            }, process.env.ACCESS_SECRET_KEY, { expiresIn: "30s" });
            res.json({ ...otherDetails, accessToken, status: 200 });
        } catch (err) {
            next(err);
        }
    },
    //LOGIN
    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) throw createError.BadRequest();

            const user = await User.findOne({ username });
            if (!user) throw createError.Unauthorized('User and password is not correct');

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) throw createError.Unauthorized('User and password is not correct');

            const { password: passwordTemp, isAdmin, ...otherDetails } = user._doc;
            const accessToken = jwt.sign({
                id: user._id,
                admin: user.isAdmin
            }, process.env.ACCESS_SECRET_KEY, { expiresIn: "30s" });
            res.json({ ...otherDetails, accessToken, status: 200 });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = authController;