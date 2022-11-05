const jwt = require("jsonwebtoken");
const client = require("./connect_redis");
const jwtService = {
    signAccessToken: (Username, IsAdmin) => {
        const accessToken = jwt.sign({
            Username,
            IsAdmin,
        }, process.env.ACCESS_SECRET_KEY, { expiresIn: "10s" });
        return accessToken; 
    },
    signRefreshToken: (Username, IsAdmin, res) => {
        const refreshToken = jwt.sign({
            Username,
            IsAdmin
        }, process.env.REFRESH_SECRET_KEY, { expiresIn: "3d" });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            path: "/"
        });
        client.set(Username.toString(), refreshToken);
        client.expire(Username.toString(), 3 * 24 * 60 * 60);
    }
};

module.exports = jwtService;