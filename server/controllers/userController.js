const User = require("../models/User.model");

const userController = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find();
            res.json({ users, status: 200 });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = userController;