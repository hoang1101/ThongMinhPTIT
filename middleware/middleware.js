const jwt = require("jsonwebtoken");
const { roleUser, idUser } = require("../controllers/user");
require('dotenv').config();
const user = require("../controllers/user");
const Account = require("../models/account")


exports.verifyToken = (req,res,next) => {
    const token = req.get("Authorization");
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken,process.env.SECRET_KEY,(err,Account) => {
            if(err) {
                res.status(403).json("Token is not vilid");
            }
            req.Account = Account;
            console.log(Account);
            next();

        });
    } else {
        res.status(401).json("You're not authenticated");

    }
};

exports.verifyTokenAndAdmin = (req,res,next) => {
    this.verifyToken(req,res, () => {
        if (req.Account.role === 'shipper'){
            next();
        }
        else {
            res.status(403).json("You are not permission!")
        }
    })
};

exports.verifyTokenAdmin = (req,res,next) => {
    this.verifyToken(req,res, async () => {
        const email = res.req.Account.email;
        const role = await user.roleUser(email)
        console.log(role);
        if (role === 'admin')
        {
            next();
        }
        else {
            res.status(403).json("You are not permission!")
        }
    })
};

exports.verifyTokenAndCustomer = (req,res,next) => {
    this.verifyToken(req,res, () => {
        if (req.Account.email === req.params.email || req.Account.role === 'customer'){
            next();
        }
        else {
            res.status(403).json("You are not permission!")
        }
    })
};

//|| req.User. === 'admin'