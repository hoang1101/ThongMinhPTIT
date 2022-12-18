const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Account = require("../models/account");
const user = require("./user");

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

exports.registerService = ({
  email,
  password,
  role,
  fullname,
  address,
  phone,
  gender,
  notification,
  birthday,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Account.findOrCreate({
        where: {
          email,
        },
        defaults: {
          email,
          password: hashPassword(password),
          role,
          isAcctive: "1",
        },
      });
      const _id = await db.Account.findOne({
        where: {
          email,
        },
        raw: true,
      });
      console.log(_id.role);
      if (_id.role === "customer" || _id.role === "admin") {
        const customer = await db.Customer.create({
          fullname,
          address,
          phone,
          gender,
          notification,
          birthday,
          userId: _id.id,
        });
        
      } else {
        const shipper = await db.Shipper.create({
          fullname,
          address,
          phone,
          gender,
          notification,
          birthday,
          userId: _id.id,
        });
      }

      const token =
        response[1] &&
        jwt.sign(
          {
            email: response[0].email,
            password: response[0].password,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "365d",
          }
        );

      resolve({
        err: token ? 0 : 2, // 0 thanh cong // 2 that bai
        msg: token
          ? "Register is successfully !"
          : "Email has been aldready used !",
        token: token || null,
        success: token ? true : false,
      });
    } catch (error) {
      reject(error);
    }
  });

exports.loginService = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Account.findOne({
        where: {
          email,
        },
        raw: true,
      });
      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);
      // console.log(isCorrectPassword);
      const token =
        isCorrectPassword &&
        jwt.sign(
          {
            email: response.email,
            password: response.password,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "365d",
          }
        );
      //console.log(User.id)//
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Login is successfully !"
          : response
          ? "Password is wrong !"
          : "email not found !",
        token: token || null,
        success: token ? true : false,
      });
    } catch (err) {
      reject(err);
    }
  });
