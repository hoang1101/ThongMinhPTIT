const db = require("../models")
const Order = require("../models/order")
const Account = require("../models/account")

const user = require("./user")

exports.createShipper = async (req, res) => {
    const {
        fullname,
        address,
        phone,
        gender,
        notification,
        birthday
    } = req.body;

    try {
        const email = res.req.Account.email;
        const _id = await user.idUser(email);
        console.log(_id);

        const shipper = await db.Shipper.create({
            fullname,
            address,
            phone,
            gender,
            notification,
            birthday,
            userId: _id,
        })
        return res.status(200).json({
            success: true,
            shipper
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
};
//  xac nhan da nhan don tu chu cua hang
exports.shipperReceive = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const email = res.req.Account.email;
        const _id = await user.idUser(email);
        console.log(_id);
        const __id = await user.idShipper(_id);
        console.log(__id);

        let order = await db.Order.findByPk(id)
        if (order.id != id) {
            return res.status(404).json({
                success: false,
                msg: 'Not Found'
            })
        }

        order = await db.Order.update({
            id_Shipper: __id,
            status : 'R',
        }, {
            where: {
                id: id
            }
        })
        return res.status(200).json({
            success: true,
            order
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}
//  xac nhan da giao xong
exports.shipperReceiveDone = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const email = res.req.Account.email;
        const _id = await user.idUser(email);
        console.log(_id);
        const __id = await user.idShipper(_id);
        console.log(__id);

        let order = await db.Order.findByPk(id)
        if (order.id != id) {
            return res.status(404).json({
                success: false,
                msg: 'Not Found'
            })
        }

        order = await db.Order.update({
            id_Shipper: __id,
            status : 'FD',
        }, {
            where: {
                id: id
            }
        })
        return res.status(200).json({
            success: true,
            order
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}
// huy don 
exports.shipperReceiveCancel = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const email = res.req.Account.email;
        const _id = await user.idUser(email);
        console.log(_id);
        const __id = await user.idShipper(_id);
        console.log(__id);

        let order = await db.Order.findByPk(id)
        if (order.id != id) {
            return res.status(404).json({
                success: false,
                msg: 'Not Found'
            })
        }

        order = await db.Order.update({
            id_Shipper: __id,
            status : 'CD',
        }, {
            where: {
                id: id
            }
        })
        return res.status(200).json({
            success: true,
            order
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}
// lay danh sach toan bo cac don hang da nhan 
exports.getAllOrder = async (req, res) => {
    try {
        const email = res.req.Account.email;
        const _id = await user.idUser(email);
        console.log(_id);
        const __id = await user.idShipper(_id);
        console.log(__id);

        const order = await db.Order.findAll({
            where: {
                status:'NR'
            },
            include: [{
                model: db.Customer,
                attributes: ["fullname","phone"]
            }],
        })

        return res.status(200).json({
            success: true,
            order
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}
exports.getAllOrdeReciever = async (req, res) => {
    try {
        const email = res.req.Account.email;
        const _id = await user.idUser(email);
        console.log(_id);
        const __id = await user.idShipper(_id);
        console.log(__id);

        const order = await db.Order.findAll({
            where: {
                id_Shipper : __id
            },
            include: [{
                model: db.Customer,
                attributes: ["fullname","phone"]
            }],
        })

        return res.status(200).json({
            success: true,
            order
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}
// tra cuu cac don hang da nhan
exports.searchOrder = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        let order = await db.Order.findOne({
            where: {
                id
            }
        });
        if (order.id != id) {
            return res.status(404).json({
                success: false,
                msg: 'Not Found'
            })
        } else {
            return res.status(200).json({
                success: true,
                order
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}
// xac nhan tren don hang dang giao da hoan thanh
exports.confirmOrder = async (req, res) => {
    const {
        id
    } = req.params
    try {
        let order = await db.Order.findOne({
            where: {
                id
            }
        });
        if (order.id != id) {
            return res.status(404).json({
                success: false,
                msg: 'Not Found'
            })
        } else {
            order = await db.Order.update({
                status: 1
            }, {
                where: {
                    id: order.id
                }
            })
        }
        return res.status(200).json({
            success: true,
            order
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}


// tao mot report 
exports.createReport = async (req, res) => {
    const {
        content,
        status
    } = req.body;
    const email = res.req.Account.email;
    const _id = await user.idUser(email);
    console.log(_id);
    try {
        const report = await db.ReportUser.create({
            content,
            userId: _id,
            status,
        })

        return res.status(200).json({
            success: true,
            report
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}



// chinh sua mot report 

exports.editReport = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        content
    } = req.body;
    try {
        const report = await db.ReportUser.update({
            content,
        }, {
            where: {
                id: id
            }
        })
        return res.status(200).json({
            success: true,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}

// xoa mot report 
exports.deleteReport = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const report = await db.ReportUser.destroy({
            where: {
                id
            }
        })
        return res.status(200).json({
            success: true,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}
// lay ra danh sach report 
exports.getAllReport = async (req, res) => {
    try {
        const email = res.req.Account.email;
        const _id = await user.idUser(email);
        console.log(_id);

        const report = await db.ReportUser.findAll({
            where: {
                userId: _id,
            }
        });
        return res.status(200).json({
            success: true,
            data: report
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
}