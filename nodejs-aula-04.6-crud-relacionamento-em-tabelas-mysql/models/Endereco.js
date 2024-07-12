import Sequelize from "sequelize"
import connection from "../config/sequelize-config.js" 

const Endereco = connection.define('enderecos', {
    rua:{
        type: Sequelize.STRING,
        allowNull: false
    },
    numero:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bairro:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Endereco.sync({force: false})

export default Endereco