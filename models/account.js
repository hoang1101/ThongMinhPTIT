const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define("Account", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique : true,
      allowNull: true,
      defaultValue: null
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    isAcctive:{
      type: DataTypes.BOOLEAN,
    }

  }, {
    freezeTableName: 'account',
  });

  Model.associate = models => {
    // Model.belongsTo(models.Post, {
    //   foreignKey: "userId",
    //   as: 'menber'
    // })
    Model.hasOne(models.Customer, {
      foreignKey: 'userId',
      //as: 'customer'
  })
    Model.hasOne(models.Shipper, {
      foreignKey: 'userId',
      //as: 'shipper'
  })
    Model.hasOne(models.ReportUser, {
      foreignKey: 'userId',
      //as: 'shipper'
  })
  }
  return Model;
};

// User.sync({force : true}).then((data) => {
//     console.log("Successfully!")
// }).catch((err) => {
//   console.log(err)
// })