const jwt = require("jsonwebtoken");
const client = require("./connect_redis");
const jwtService = {
    signAccessToken: (Username, Role) => {
        const accessToken = jwt.sign({
            Username,
            Role,
        }, process.env.ACCESS_SECRET_KEY, { expiresIn: "600s" });
        return accessToken;
    },
    signRefreshToken: (Username, Role, res) => {
        const refreshToken = jwt.sign({
            Username,
            Role
        }, process.env.REFRESH_SECRET_KEY, { expiresIn: "3d" });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            path: "/"
        });
        client.set(Username.toString(), refreshToken);
        client.expire(Username.toString(), 3 * 24 * 60 * 60);
    }
};

module.exports = jwtService;