const express = require("express") // Importando o Express
const app = express(); // Iniciando o Express

app.get("/",function(req,res){
    res.send("Bem vindo ao meu site! :)")
});

app.get("/blog/:artigo?",function(req,res){

    var artigo = req.params.artigo

    if(artigo){
        res.send(`<h2>Artigo: ${artigo}</h2>`)
    }else{
        res.send("Bem vindo ao meu blog! ;)")
    }
})

app.get("/canal/youtube",function(req,res){
    var canal = req.query["canal"]

    if(canal) {
        res.send(canal)
    }else{
        res.send("Nenhum canal fornecido.")
    }    
})

// TRABALHANDO COM PARÂMETROS
app.get("/ola/:nome/:empresa",function(req,res){
    // REQ = Dados enviados pelo usuário
    // RES = Resposta enviada para o usuário 
    var nome = req.params.nome
    var empresa = req.params.empresa
    res.send(`<h1>Oi ${nome} da ${empresa}</h1>`)
})

app.listen(8080,function(erro){
    if(erro) {
        console.log("Ocorreu um erro!")

    }else{
        console.log("Servidor iniciado com sucesso!")
    }
})
