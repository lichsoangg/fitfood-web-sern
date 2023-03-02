const checkFieldExisted = require("../utils/checkFieldExisted");
const registerValidatorExisted = {
  checkUsernameExisted: async (req, res, next) => {
    const isUsed = await checkFieldExisted(
      req.body.Username,
      "Username",
      "User"
    );
    if (isUsed) {
      res
        .status(409)
        .json({ status: 409, message: "Username đã được sử dụng" });
    } else {
      next();
    }
  },
  checkPhoneNumberExisted: async (req, res, next) => {
    const isUsed = await checkFieldExisted(
      req.body.PhoneNumber,
      "PhoneNumber",
      "User"
    );
    if (isUsed) {
      res
        .status(409)
        .json({ status: 409, message: "Số điện thoại đã được sử dụng" });
    } else {
      next();
    }
  },
};

module.exports = registerValidatorExisted;
