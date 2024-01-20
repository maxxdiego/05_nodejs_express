import Sequelize from "sequelize"
import connection from "../config/sequelize-config.js" 

const Cliente = connection.define('clientes', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Cliente.sync({force: false})

export default Cliente