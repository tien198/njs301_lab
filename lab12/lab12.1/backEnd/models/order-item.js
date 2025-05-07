const SE = require('sequelize')
const se = require('../utils/database')

const OrderItem = se.define('orderItem', {
    id: {
        type: SE.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    orderId: SE.INTEGER,
    productId: SE.INTEGER
})

module.exports = OrderItem