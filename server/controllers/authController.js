const bcrypt = require("bcrypt");
const User = require("../models/User.model.js");
const jwt = require("jsonwebtoken");
const { signAccessToken, signRefreshToken } = require("../utils/jwt_service.js");
const client = require("../utils/connect_redis.js");
const Customer = require("../models/Customer.model.js");
const randomNumberVerifyEmail = require("../utils/randomNumberVerifyEmail.js");
const nodemailer = require('nodemailer');
const authController = {
  //REGISTER
  register: async (req, res, next) => {
    try {
      const { username, password, ...otherInfo } = req.body;
      if (!username || !password) return res.status(400).json("Yêu cầu không hợp lệ");
      User.getUserWithName(username, async (err, data) => {
        if (err) return res.status(400).json({ message: "Yêu cầu không hợp lệ" });
        if (data.length) return res.status(409).json({ message: "Tên tài khoản đã tồn tại" });
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(req.body.password, salt);

        Customer.postCustomer({ ...req.body, password: passwordHashed }, (err, data) => {
          if (err) {
            return res.status(400).json(err);
          }

          const accessToken = signAccessToken(username, `Customer`);
          signRefreshToken(username, false, res);
          return res.status(201).json({ username, IsValid: 0, accessToken, status: 201 });
        });
      }
      );

    } catch (err) {
      next(err);
    }
  },

  //CHECK USERNAME EXIST
  checkUsername: async (req, res, next) => {
    try {
      const { username } = req.body;
      User.getUserWithName(username, async (err, data) => {
        if (err) return res.status(400).json({ message: "Yêu cầu không hợp lệ" });
        if (data.length) return res.status(409).json({ message: "Tên tài khoản đã được đăng ký" });
        return res.status(200).json({});
      });
    } catch (err) {
      next(err);
    }
  },
  //CHECK PHONE NUMBER EXIST
  checkPhoneNumber: async (req, res, next) => {
    try {
      const { phoneNumber, username } = req.body;
      Customer.getCustomerWithPhone(phoneNumber, async (err, data) => {
        if (err) return res.status(400).json({ message: "Yêu cầu không hợp lệ" });
        if (data.length) {

          if (data[0].Username !== username) {
            return res.status(409).json({ message: "Số điện thoại đã được đăng ký" });
          }

        }
        return res.status(200).json({});
      });
    } catch (err) {
      next(err);
    }
  },
  //LOGIN
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) return res.status(400).json({ message: "Yêu cầu không hợp lệ" });
      User.getUserWithName(username, async (err, data) => {
        if (err) return res.status(400).json({ message: "Yêu cầu không hợp lệ" });
        if (data?.length) {
          const validPassword = await bcrypt.compare(password, data[0].Password);
          if (!validPassword) return res.status(401).json({ message: "Tài khoản hoặc mật khẩu không đúng" });
          const { Password, ...otherInfo } = data[0];
          const accessToken = signAccessToken(username, data[0].Role);
          signRefreshToken(username, data[0].Role, res);
          return res.status(200).json({ ...otherInfo, IsValid: data[0].IsValid, accessToken, status: 200 });
        } else {
          return res.status(401).json({ message: "Tài khoản hoặc mật khẩu không đúng" });
        }
      });

    } catch (err) {
      next(err);
    }
  },


  //REFRESH
  refresh: (req, res, next) => {
    try {
      const refreshTokenClient = req.cookies.refreshToken;
      if (!refreshTokenClient) return res.status(403).json({ message: "Không có token" });
      jwt.verify(refreshTokenClient, process.env.REFRESH_SECRET_KEY, async (err, user) => {
        if (err) return res.status(401).json({ message: "Bạn không có quyền truy cập" });
        const refreshTokenServer = await client.get(user.Username.toString());
        if (refreshTokenServer !== refreshTokenClient) return res.status(404).json({ message: "Token không hợp lệ" });
        const newAccessToken = signAccessToken(user.Username, user.Role);
        signRefreshToken(user.Username, user.Role, res);
        return res.status(200).json({ status: 200, accessToken: newAccessToken });
      });
    } catch (err) {
      next(err);
    }
  },

  //LOG OUT
  logout: async (req, res, next) => {
    try {
      client.del(req.user.Username);
      res.clearCookie("refreshToken");
      return res.status(200).json({ status: 200, message: "Logout Successfully" });
    } catch (err) {
      next(err);
    }
  },
  //Verify Email 
  verifyEmail: async (req, res, next) => {
    const { code: codeClient } = req.body;
    const username = req.user.Username;
    const codeServer = await client.get(`${username.toString()}-verify-email`);
    if (Number(codeClient) === Number(codeServer)) {
      User.updateActive(username, (err, response) => {
        if (err) return res.status(400).json({ status: 400, message: "Yêu cầu không hợp lệ" });
        return res.status(200).json({ status: 200, message: "Kích hoạt tài khoản thành công" });
      });

    }
    else {
      return res.status(401).json({ status: 401, message: "Mã xác thực không đúng" });

    }
  },
  //sendVerifyEmail
  sendEmailVerify: async (req, res, next) => {
    const username = req.user.Username;
    const randomNumber = randomNumberVerifyEmail(username);

    //transporter config mail server
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    //content email
    let content = '';
    content += `
    <body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
  <center style="background-color:#E1E1E1;">
    <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTbl" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;">
      <tr>
        <td align="center" valign="top" id="bodyCell">
          <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailHeader">
            <tr>
              <td align="center" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" valign="top">
                      <table border="0" cellpadding="10" cellspacing="0" width="500" class="flexibleContainer">
                        <tr>
                          <td valign="top" width="500" class="flexibleContainerCell">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                <td align="left" valign="middle" id="invisibleIntroduction" class="flexibleContainerBox" style="display:none;display:none !important;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
                                    <tr>
                                      <td align="left" class="textContent">
                                        <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;">
                                          Here you can put short introduction of your email template.
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                </table>

              </td>
            </tr>
          </table>
          <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="500" id="emailBody">
            <tr>
              <td align="center" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#eb5757">
                  <tr>
                    <td align="center" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                        <tr>
                          <td align="center" valign="top" width="500" class="flexibleContainerCell">
                            <table border="0" cellpadding="30" cellspacing="0" width="100%">
                              <tr>
                                <td align="center" valign="top" class="textContent">
                                  <h1 style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:35px;font-weight:normal;margin-bottom:5px;text-align:center;"> Fitfood Company</h1>
                                  <h2 style="text-align:center;font-weight:normal;font-family:Helvetica,Arial,sans-serif;font-size:23px;margin-bottom:10px;color:#FFFFFF;line-height:135%;">Xác thực Email</h2>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                        <tr>
                          <td align="center" valign="top" width="500" class="flexibleContainerCell">
                            <table border="0" cellpadding="30" cellspacing="0" width="100%">
                              <tr>
                                <td align="center" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                      <td valign="top" class="textContent">
                                        <h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">Mã xác thực là:</h3>
                                        <h3 style="color:#000;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:40px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:center;">${randomNumber}</h3>
                                        <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:135%;">Mã xác thực có thời hạn trong vòng 10 phút.</div>
                                      </td>
                                    </tr>
                                    <tr>
                                    <td valign="top" class="textContent">
                                        <h4 style="text-align:center;">Copyright &#169; 2022. All rights reserved.</h4>
                                     </td>
                                    <tr/> 
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8">
                  <tr>
                    <td align="center" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                        <tr>
                          <td align="center" valign="top" width="500" class="flexibleContainerCell">
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!-- footer -->
          <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailFooter">
            <tr>
              <td align="center" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                        <tr>
                          <td align="center" valign="top" width="500" class="flexibleContainerCell">
                            <table border="0" cellpadding="30" cellspacing="0" width="100%">
                              <tr>
                                <td valign="top" bgcolor="#E1E1E1">
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!-- // end of footer -->
        </td>
      </tr>
    </table>
  </center>
</body>`;
    var mainOptions = {
      from: 'Fitfood Company',
      to: username,
      subject: 'Xác thực tài khoản Fitfood',
      html: content,
    };
    transporter.sendMail(mainOptions, function (err, info) {

      if (err) {
        return res.status(400).json({ status: 400, message: err.message });
      } else {
        return res.status(200).json({ status: 200, message: "Gửi Email thành công!" });
      }
    });
  }
};

module.exports = authController;