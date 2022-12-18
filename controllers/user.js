const db = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Account = require("../models/account");
require('dotenv').config()

exports.idUser = async (email) => {
    try {
        const loggeduser = await db.Account.findOne({
            where: {
                email
            },
            raw: true
        })
        return loggeduser.id;


    } catch (err) {
        reject(err)
    }
}
exports.roleUser = async (email) => {
    try {
        const loggeduser = await db.Account.findOne({
            where: {
                email
            },
            raw: true
        })
        return loggeduser.role;


    } catch (err) {
        reject(err)
    }
}


exports.idCustomer = async (userId) => {
    try {
        const customer = await db.Customer.findOne({
            where: {
                userId
            }
        })
        return customer.id;
    } catch (err) {
        reject(err)
    }
}



exports.idShipper = async (userId) => {
    try {
        const shipper = await db.Shipper.findOne({
            where: {
                userId
            }
        })
        return shipper.id;
    } catch (err) {
        reject(err)
    }
}

// exports.idShow = async (id) => {
//     let order= await db.Order.findByPk(id)
//     if (order.id != id) {
//         return res.status(404).json('Not Found')
//     } 
//     // else return order.id;
// }

exports.updatePassword =  (
    email
) => {

    let text = Math.floor(Math.random() * 999999) + 100000;
    let result = text.toString();
    console.log(result);
    const password = bcrypt.hashSync(result, bcrypt.genSaltSync(12));
    this.updatepass(password,email);
    return result;

}
exports.updatepass = async(password,email) => {
    try {
        var user = await db.Account.update({
            password: password,
        }, {
            where: {
                email: email,
            }
        })
    } catch (error) {
        return error
    }
}

exports.createUser = async(email) => {
    try {
        const id = await this.idUser(email);
        const customer = await db.Customer.create({
            userId : id,
        })
    } catch (error) {
        return error
    }
}




