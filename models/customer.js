const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define("Customer", {
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
        freezeTableName: 'customer',
    });

    Model.associate = models => {
        Model.belongsTo(models.Account, {
            foreignKey: 'userId',
            //as:'user'
        })
        Model.hasMany(models.Order, {
            foreignKey: 'id_Customer',
            //as: 'customer'
        })
    }
    return Model;
};
