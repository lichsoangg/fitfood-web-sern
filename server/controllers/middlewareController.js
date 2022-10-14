const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const middlewareController = ({
    //verifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        try {
            if (token) {
                const accessToken = token.split(" ")[1];
                jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (err, user) => {
                    if (err) throw createError[403]('Token not valid');
                    req.user = user;
                    next();
                });
            } else {
                throw createError.Unauthorized(`You're not authenticated`);
            }
        } catch (err) {
            next(err);
        }
    }
});

module.exports = middlewareController;