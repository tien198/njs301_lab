const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('node-complete', 'root', '9815', {
    host: '127.0.0.1',
    dialect: 'mysql',
})

module.exports = sequelize