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

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

exports.register = async (req, res) => {
  const {
    email,
    password,
    role,
    fullname,
    address,
    phone,
    gender,
    notification,
    birthday,
  } = req.body;
  try {
    if (!email || !password || !role)
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
        // data: account,
        // account.role
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
    // console.log(response);//
    // if (User.isAcctive === 1) return res.status(400).json({
    //     err: 1,
    //     msg: 'Tai khoan bi khoa'
    // })
    // const a = customerService.roleUser(email)

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
          // account.role
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
