const Customer = require("../models/Customer.model");
const fs = require("fs");
const path = require("path");
const customerController = {
  updateCustomer: (req, res, next) => {

    const data = req.body;
    username = req.user.Username;
    if (req.file) {
      Customer.getCustomerWithUsername(username, async (err, customer) => {
        if (err) return res.status(400).json({ message: err.message });
        if (customer[0].Avatar) {
          let fileOldNameWithPath = path.join(__dirname, `../upload/images/${customer[0].Avatar}`);
          if (fs.existsSync(fileOldNameWithPath)) {
            fs.unlink(fileOldNameWithPath, (err) => {
              if (err) {
                console.log(err);
              }
            });
          }
        }
      });
      data["Avatar"] = req.file.filename;

    }
    try {
      Customer.updateCustomer(data, username, (err, data) => {
        if (err) return res.status(400).json({ message: err.message });
        return res.status(200).json({ status: 200, message: "Cập nhật khách hàng thành công" });
      });

    } catch (err) {
      next(err);
    }

  }
};

module.exports = customerController;