const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define("ReportUser", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    }, {
        freezeTableName: 'reportUser',
    });

    Model.associate = models => {
        Model.belongsTo(models.Account, {
            foreignKey: 'userId',
            //as:'user'
        })
        // Model.belongsTo(models.Shipper, {
        //    foreignKey: 'idUser',
        //     //as:'user'
        // })
        // Model.has(models.Order, {
        //     foreignKey: 'id_Customer',
        //     //as: 'customer'
        // })
    }
    return Model;
};

// Post.sync({force : true}).then((data) => {
//     console.log("Successfully!")
// }).catch((err) => {
//   console.log(err)
// })