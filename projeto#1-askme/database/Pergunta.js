const Sequelize = require("sequelize")
const connection = require("./database")

const Pergunta = connection.define('perguntas', {
    titulo:{
        type: Sequelize.STRING,
        allowNULL: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNULL: false
    }
})

Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta