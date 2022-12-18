const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define("Commodities", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        cost: {
            type: DataTypes.INTEGER,
        },
    }, {
        freezeTableName: 'commodities',
    });

    Model.associate = models => {
        // Model.belongsTo(models.reportUser, {
        //     foreignKey: 'idUser',
        //     //as:'user'
        // })
        Model.hasOne(models.Order, {
            foreignKey: 'id_Commodities',
            //as: 'customer'
        })
    }
    return Model;
};

// Post.sync({force : true}).then((data) => {
//     console.log("Successfully!")
// }).catch((err) => {
//   console.log(err)
// })