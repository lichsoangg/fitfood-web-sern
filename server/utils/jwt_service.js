const jwt = require("jsonwebtoken");
const client = require("./connect_redis");
const jwtService = {
  signAccessToken: (Username, Role, IsActive) => {
    const accessToken = jwt.sign(
      {
        Username,
        Role,
        IsActive,
      },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: "300s" }
    );
    return accessToken;
  },
  signRefreshToken: (Username, Role, IsActive, res) => {
    const refreshToken = jwt.sign(
      {
        Username,
        Role,
        IsActive,
      },
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: "3d" }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
    });
    client.set(Username.toString(), refreshToken);
    client.expire(Username.toString(), 3 * 24 * 60 * 60);
  },
};

module.exports = jwtService;
