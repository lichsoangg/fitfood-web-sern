const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
const middlewareController = ({
    //verifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        try {
            if (token) {
                const accessToken = token.split(" ")[1];
                jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (err, user) => {
                    if (err) return res.json(createError(401, "You're not authenticated"));
                    req.user = user;
                    next();
                });
            } else {
                res.json(createError(403, "Token not valid"));
            }
        } catch (err) {
            next(err);
        }
    }
});

module.exports = middlewareController;