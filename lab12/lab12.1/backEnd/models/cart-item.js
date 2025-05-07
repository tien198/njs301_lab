const SE = require('sequelize')
const se = require('../utils/database')

const CartItem = se.define('cartItem', {
    id: {
        type: SE.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    productId: SE.INTEGER,
    cartId: SE.INTEGER,
    quantity: SE.INTEGER,
})

module.exports = CartItem