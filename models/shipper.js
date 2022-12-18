const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define("Shipper", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fullname: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    gender: DataTypes.BOOLEAN,
    notification: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    },
    birthday: {
      type: DataTypes.DATEONLY,
    },
  }, {
    freezeTableName: 'shipper',
  });

  Model.associate = models => {
    Model.belongsTo(models.Account, {
       foreignKey: 'userId',
      // as:'user'
    })
    Model.hasMany(models.Order, {
      foreignKey: 'id_Shipper',
      //as: 'shipper'
    })
    // Model.hasMany(models.ReportUser, {
    //   //foreignKey: 'idUser',
    //   //as: 'shipper'
    // })
  }
  return Model;
};

// Post.sync({force : true}).then((data) => {
//     console.log("Successfully!")
// }).catch((err) => {
//   console.log(err)
// })