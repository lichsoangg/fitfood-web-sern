const User = require("../models/User.model");
const db = require("../utils/connect_mysql");
const userController = {
    getAllUsers: async (req, res, next) => {
        try {
            User.getUsers((err, data) => {
                if (!err) {
                    res.status(200).json({ data });
                } else {
                    const err= new Error("Bad request");
                    err.status=400;
                    return err;
                }
            });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = userController;