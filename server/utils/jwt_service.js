const jwt = require("jsonwebtoken");
const client = require("./connect_redis");
const jwtService = {
    signAccessToken: (ID, IsAdmin) => {
        const accessToken = jwt.sign({
            ID,
            IsAdmin,
        }, process.env.ACCESS_SECRET_KEY, { expiresIn: "30s" });
        return accessToken;
    },
    signRefreshToken: (ID, IsAdmin, res) => {
        const refreshToken = jwt.sign({
            ID,
            IsAdmin
        }, process.env.REFRESH_SECRET_KEY, { expiresIn: "1d" });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            path: "/"
        });
        client.set(ID.toString(), refreshToken);
        client.expire(ID.toString(), 3 * 24 * 60 * 60);
    }
};

module.exports = jwtService;