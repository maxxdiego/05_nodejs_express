const express = require("express") // Importando o Express (CommonJS Modules)
const app = express() // Iniciando o Express

// Criando a primeira rota do site (ROTA PRINCIPAL)
app.get("/", function (req, res) {
    res.send("<h1>Bem vindo ao meu site! :)</h1>")
})

// ROTA PERFIL 
app.get("/perfil/:nome", function (req, res) { // :nome -> Parâmetro obrigatório
    // res.send(req.params.nome) 
    var nome = req.params.nome // Coletando o parâmetro :nome vindo da URL (método GET) e gravando na variável nome.
    res.send(`<h2>Olá, ${nome}!<br> Seja bem-vindo ao seu perfil!</h2>`)
})

// ROTA VÍDEOS COM MÚLTIPLOS PARÂMETROS OBRIGATÓRIOS (:playlist e :video)
app.get("/videos/:playlist/:video", function (req, res) {
    var playlist = req.params.playlist
    var video = req.params.video
    res.send(`<h2 style='text-align: center;'>Você está na playlist de ${playlist}.</h2><br>
    Reproduzindo o vídeo <strong>${video}</strong>...`)
})

// Iniciando o servidor na porta 8080
app.listen(8080, function(erro) {
    if (erro) {
        console.log("Ocorreu um erro!")
    } else {
        console.log("Servidor iniciado com sucesso!")
    }
})