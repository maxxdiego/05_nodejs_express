// Importando o módulo Sequelize
const Sequelize = require('sequelize')

const connection = new Sequelize('askme', 'root', 'admin',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;