const express = require("express") // Importando o Express (CommonJS Modules)
const app = express() // Iniciando o Express

// Criando a primeira rota do site (ROTA PRINCIPAL)
app.get("/", function (req, res) {
    res.send("<h1>Bem vindo ao meu site! :)</h1>")
})

// ROTA PERFIL
app.get("/perfil", function (req, res) {
    res.send("<h1>Perfil do usuário</h1>")
})

// ROTA VÍDEOS
app.get("/videos", function (req, res) {
    res.send("<h1 style='text-align: center;'>Essa é página de vídeos</h1>")
})

// Iniciando o servidor na porta 8080
app.listen(8080, function(erro) {
    if (erro) {
        console.log("Ocorreu um erro!")
    } else {
        console.log("Servidor iniciado com sucesso!")
    }
})