const SE = require('sequelize')
const se = require('../utils/database')

const User = se.define('user', {
    id: {
        type: SE.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: SE.STRING,
        allowNull: false,
    },
    email: {
        type: SE.STRING,
        allowNull: false
    }
})

module.exports = User
