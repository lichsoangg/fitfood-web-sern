const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
const middlewareController = {
  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization;
    try {
      if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (err, user) => {
          if (err)
            return res
              .status(401)
              .json({ message: "Bạn không có quyền truy cập" });
          req.user = user;
          next();
        });
      } else {
        res.status(403).json({ message: "Không có token" });
      }
    } catch (err) {
      next(err);
    }
  },
  //check role
  checkRole: (ValidRoles) => {
    return (req, res, next) => {
      const roleUserRequest = req.user.Role;
      if (ValidRoles.includes(roleUserRequest)) {
        next();
      } else {
        res
          .status(401)
          .json({ status: 401, message: "Người dùng không có quyền" });
      }
    };
  },
};

module.exports = middlewareController;
