const SE = require('sequelize')
const se = require('../utils/database')

const Order = se.define('order', {
    id: {
        type: SE.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    total: {
        type: SE.INTEGER,
        defaultValue: 0
    },
    userId: SE.INTEGER
})

module.exports = Order