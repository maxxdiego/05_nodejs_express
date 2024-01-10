// Importa o framework Express.js
const express = require("express")
// Carrega o Express.js na varável app
const app = express();
// Importa o Body Parser (para receber dados de formulários)
const bodyParser = require("body-parser")
// Importando o arquivo de conexão
const connection = require("./database/database")
// Importando o model Pergunta (tabela do banco de dados)
const Pergunta = require("./database/Pergunta")
// Importando model Resposta (tabela do banco de dados)
const Resposta = require("./database/Resposta")

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

// Aqui dizemos ao Express para usar o EJS como View Engine
app.set('view engine', 'ejs')
// Definindo o Express para aceitar arquivos estáticos (pasta public)
app.use(express.static('public'))
// Definindo o uso do Body Parser junto ao Express
app.use(bodyParser.urlencoded({extended: false}))
// Permite que o Body Parser leia dados de formulários enviados via json
app.use(bodyParser.json())

//ROTAS

// Rota - Index
app.get("/",(req, res) => {
    // .findAll é equivalente ao SELECT * FROM
    Pergunta.findAll({raw: true, order:[
        ['id', 'DESC'] // ASC = Crescente || DESC = Decrescente
    ]}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        })
    })
    
})

// ROTA - Perguntar
app.get("/perguntar",(req, res) => {
    res.render("perguntar")
})


// ROTA - Salvar pergunta - Recebe dados do formulário
app.post("/salvarpergunta",(req, res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao

    // .create é equivalente ao INSERT INTO
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })
})

// ROTA - Pergunta - Abre a tela da pergunta
app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id
    // .findOne faz a busca de um único registro do banco
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined) { // Pergunta encontrada

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id','DESC']
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                })
            })

        }else{ // Não encontrada
            res.redirect("/")
        }
    })
})

// ROTA - Responder
app.post("/responder",(req, res) => {
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect(`/pergunta/${perguntaId}`)
    })
})

// ROTA - Apagar pergunta
app.get("/apagar/:id", (req, res) => {
    var id = req.params.id
    // .destroy apaga um registro do banco de dados
    Pergunta.destroy({
        where: {id: id}
    }).then(() => {
        res.redirect("/")
    })
})

// ROTA - Alterar
app.get("/alterar/:id", (req, res) => {
    var id = req.params.id
    // .findOne faz a busca de um único registro do banco
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined) { // Pergunta encontrada
        res.render("alterar",{
            pergunta: pergunta,
        })
        }else{ // Não encontrada
            res.redirect("/")
        }
    })
})

// ROTA - Alterar pergunta - Recebe dados do formulário
app.post("/alterarpergunta",(req, res) => {
    
    var id = req.body.id
    var titulo = req.body.titulo
    var descricao = req.body.descricao

    // .update é equivalente ao UPDATE
    Pergunta.update({
        titulo: titulo,
        descricao: descricao
    }, 
    {
        where: {id: id},
    }).then(() => {
        res.redirect("/")
    })
})

//Inicia o servidor na porta 4000
app.listen(4000,()=>{
    console.log("Servidor iniciado...")
})