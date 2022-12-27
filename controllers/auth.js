const e = require("cors");
const authController = require("./authController");
const Account = require("../models/account");
const Customer = require("../models/customer");
const bcrypt = require("bcrypt");
const mailer = require("../utils/mailer");
const db = require("../models");
const { updatePassword, idUser } = require("./user");
const { createCustomer } = require("./customer");
const account = require("../models/account");
const user = require("../controllers/user");
const customer = require("../models/customer");
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

exports.register = async (req, res) => {
  const { email, password, role, fullname, address, phone, gender, birthday } =
    req.body;
  try {
    if (
      !email ||
      !password ||
      !role ||
      !fullname ||
      !address ||
      !phone ||
      !gender ||
      !birthday
    )
      return res.status(400).json({
        success: false,
        err: 1,
        msg: "Missing inputs !",
      });
    const response = await authController.registerService(req.body);

    if (response.success === true) {
      return res.status(200).json({
        success: true,
        response,
        data: account,
      });
    } else {
      return res.status(404).json({
        success: false,
        response,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: -1,
      msg: "Fail at auth controller: " + err,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({
        success: false,
        err: 1,
        msg: "Missing inputs !",
      });

    const id = await idUser(email);
    console.log(id);
    const account = await db.Account.findOne({
      where: {
        id: id,
      },
    });
    console.log(account.isAcctive);
    if (account.isAcctive === false) {
      return res.status(400).json({
        success: false,
        msg: "Tai khoan cau ban da bi khoa !",
      });
    } else {
      const response = await authController.loginService(req.body);
      account.password = undefined;
      const token = response.token;
      if (response.success === true) {
        return res.status(200).json({
          success: true,
          token,
          data: account,
        });
      } else {
        return res.status(404).json({
          success: false,
          response,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: -1,
      msg: "Fail at auth controller: " + err,
    });
  }
};

exports.sendResetEmail = async (req, res) => {
  const { email } = req.body;
  try {
    if (!req.body.email) {
      return res.status(404).json({
        success: false,
        msg: "Not Found",
      });
    } else {
      const account = await db.Account.findOne({
        where: {
          email: req.body.email,
        },
      });
      // console.log(user.email);//
      if (!account) {
        return res.status(404).json({
          success: false,
          msg: "Not Found",
        });
      } else {
        bcrypt
          .hash(account.email, parseInt(process.env.BCRYPT_SALT_ROUND))
          .then((hashedEmail) => {
            const password = updatePassword(req.body.email);
            // `<a href="${process.env.APP_URL}/password/reset/${user.email}?token=${hashedEmail}"> Reset Password </a>`
            mailer.sendMail(
              account.email,
              "Reset password",
              `<p>GHN Express:<a>${password}</a> la mat khau cua ban. Vui long khong chia se ma cho bat ki ai, bat ki hinh thuc nao. Moi thac mac vui long lien he:<a>19001009</a> </p>`
            );
          });
      }
      return res.status(404).json({
        success: true,
        msg: "Gui mail thanh cong ! Vui long kiem tra de nhan mat khau !",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: -1,
      msg: "Fail at auth controller: " + err,
    });
  }
};

exports.resetPassWord = async (req, res) => {
  const { passwordOld, passwordNew, passwordConfirm } = req.body;
  try {
    if (!passwordOld || !passwordNew || !passwordConfirm) {
      return res.status(500).json({
        success: false,
        msg: "Missing Input!",
      });
    }

    const email = res.req.Account.email;
    const id = await idUser(email);
    console.log(id);

    let account = await db.Account.findByPk(id);
    // console.log(account.password);

    const isPassword = bcrypt.hashSync(req.body.passwordOld, account.password);

    if (!isPassword) {
      return res.status(400).json({
        success: false,
        msg: "Sai mat khau!",
      });
    }
    if (req.body.passwordNew !== req.body.passwordConfirm) {
      return res.status(400).json({
        success: false,
        msg: "Mat khau moi khong khop!",
      });
    }

    account = await db.Account.update(
      {
        password: hashPassword(passwordNew),
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      msg: "Thay doi mat khau thanh cong",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: -1,
      msg: "Fail at auth controller: " + err,
    });
  }
};

exports.getInfo = async (req, res) => {
  try {
    const email = res.req.Account.email;
    const _id = await db.Account.findOne({
      where: {
        email,
      },
      raw: true,
    });
    console.log(_id.role);
    const data = {};
    if (_id.role === "customer" || _id.role === "admin") {
      const customer = await db.Customer.findOne({
        where: { userId: _id.id },
      });
      return res.status(200).json({ customer });
    } else {
      const shipper = await db.Shipper.findOne({
        where: {
          userId: _id.id,
        },
      });
      return res.status(200).json({ shipper });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: -1,
      msg: "Fail at auth controller: " + err,
    });
  }
};
