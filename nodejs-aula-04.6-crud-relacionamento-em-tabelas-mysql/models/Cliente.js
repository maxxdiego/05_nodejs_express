import Sequelize from "sequelize"
import connection from "../config/sequelize-config.js" 
import Endereco from "./Endereco.js" // Importando o modelo Endereco

const Cliente = connection.define('clientes', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Endereco, // Referenciando o modelo Endereco
            key: 'id' // Referenciando a coluna 'id' do Endereco
        }
    }
})

// Definindo a associação
Cliente.belongsTo(Endereco, { foreignKey: 'endereco_id' });

Cliente.sync({force: false})

export default Cliente