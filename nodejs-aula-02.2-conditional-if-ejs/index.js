const express = require("express") // Importando o Express (CommonJS Modules)
const app = express() // Iniciando o Express

app.set('view engine', 'ejs') // Definindo o EJS para renderizar páginas

// Criando a primeira rota do site (ROTA PRINCIPAL)
app.get("/", function (req, res) {
    res.render('index') // Será renderizada a página 'views\index.ejs'
})

// ROTA PERFIL 
app.get("/perfil", function (req, res) {
    res.render('perfil')
})

// ROTA VÍDEOS
app.get("/videos", function (req, res) {
    res.render('videos')
})

// ROTA PRODUTOS
app.get("/produtos/:produto?", function (req, res) {
    produto = req.params.produto
    // Array com os produtos
    produtos = ['Computador', 'Celular', 'Tablet', 'Notebook'] 
    res.render('produtos', {
    // Enviando as variáveis para página HTML
        produto : produto,
        produtos : produtos
    // Na página produtos.ejs haverá uma condição
    })
})

// ROTA PEDIDOS
app.get("/pedidos", function (req, res) {
    res.render('pedidos')
})

// Iniciando o servidor na porta 8080
app.listen(8080, function(erro) {
    if (erro) {
        console.log("Ocorreu um erro!")
    } else {
        console.log("Servidor iniciado com sucesso!")
    }
})