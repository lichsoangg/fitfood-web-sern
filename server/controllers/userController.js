const User = require("../models/User.model");
const db = require("../utils/connect_mysql");
const createError = require("../utils/createError");
const userController = {
    getAllUsers: async (req, res, next) => {
        try {
            User.getUsers((err, data) => {
                if (!err) {
                    res.json({ data, status: 200 });
                } else {
                    return createError(400, "Bad Request");
                }
            });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = userController;