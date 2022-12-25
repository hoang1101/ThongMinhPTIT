const db = require("../models");
const customer = require("../models/customer");
const user = require("./user");

// tao mot don hang do Customer
exports.createOrder = async (req, res) => {
  const {
    nameReceiver,
    addressReceiver,
    phoneReceiver,
    status,
    addressCustomer,
    id_Commodities,
    totalMoney,
  } = req.body;

  try {
    if (
      !nameReceiver ||
      !addressReceiver ||
      !phoneReceiver ||
      !addressCustomer ||
      !id_Commodities ||
      !totalMoney
    )
      return res.status(500).json({
        success: false,
        msg: "Missing Input!",
      });

    const email = res.req.Account.email;
    const _id = await user.idUser(email);
    console.log(_id);
    const __id = await user.idCustomer(_id);
    console.log(__id);

    const order = await db.Order.create({
      nameReceiver,
      addressReceiver,
      phoneReceiver,
      status: "NR",
      addressCustomer,
      id_Commodities,
      totalMoney,
      id_Customer: __id,
    });
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: -1,
      msg: "Fail at auth controller: " + err,
    });
  }
};

exports.getAllOrder = async (req, res) => {
  try {
    const email = res.req.Account.email;
    const _id = await user.idUser(email);
    console.log(_id);
    const __id = await user.idCustomer(_id);
    console.log(__id);

    const data = await db.Order.findAll({
      where: {
        id_Customer: __id,
      },
      include: [
        {
          model: db.Customer,
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: -1,
      msg: "Fail at auth controller: " + err,
    });
  }
};
// lay danh sach hang chua duoc giao
exports.getAllOrderF = async (req, res) => {
  try {
    const email = res.req.Account.email;
    const _id = await user.idUser(email);
    console.log(_id);
    const __id = await user.idCustomer(_id);
    console.log(__id);

    const order = await db.Order.findAll({
      where: {
        id_Customer: __id,
        status: "NR" && "R",
      },
    });

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: -1,
      msg: "Fail at auth controller: " + err,
    });
  }
};
// chinh sua don hang chua duoc giao
exports.editOrderF = async (req, res) => {
  const {
    nameReceiver,
    addressReceiver,
    phoneReceiver,
    addressCustomer,
    id_Commodities,
    totalMoney,
  } = req.body;

  const { id } = req.params;
  try {
    console.log(id);
    if (!id)
      return res.status(500).json({
        success: false,
        msg: "Fail!",
      });
    if (
      !nameReceiver ||
      !addressReceiver ||
      !phoneReceiver ||
      !addressCustomer ||
      !id_Commodities ||
      !totalMoney
    )
      return res.status(500).json({
        success: false,
        msg: "Missing Input!",
      });
    var data = await db.Order.findByPk(id);
    if (data.id != id) {
      return res.status(404).json({
        success: false,
        msg: "Not Found",
      });
    }

    data = await db.Order.update(
      {
        nameReceiver,
        addressReceiver,
        phoneReceiver,
        addressCustomer,
        id_Commodities,
        totalMoney,
      },
      {
        where: {
          id: data.id,
          status: "NR",
        },
      }
    );
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: -1,
      msg: "Fail at auth controller: " + err,
    });
  }
};
// lay ra don hang can chinh sua
// exports.GetOrderId = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const data = await db.Order.findByPk(id);
//     return res.status(200).json({
//       success: true,
//       data,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       err: -1,
//       msg: "Fail at auth controller: " + err,
//     });
//   }
// };

// huy don hang chua duoc giao
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(404).json({
      success: false,
      msg: "Not found !",
    });
  try {
    const order = await db.Order.destroy({
      where: {
        id,
        status: "NR",
      },
    });
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: -1,
      msg: "Fail at auth controller: " + err,
    });
  }
};
