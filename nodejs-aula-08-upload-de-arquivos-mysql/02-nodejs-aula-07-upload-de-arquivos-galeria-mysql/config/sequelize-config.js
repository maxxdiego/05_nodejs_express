// Importando o Sequelize
import Sequelize from "sequelize"

// Criando os dados de conexão com o banco de dados
const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'admin',
    // Comente essa linha na primeira execução da aplicação
    database: 'galeria', 
    timezone: "-03:00"
})

export default connection