const mongoose = require("mongoose")
const articleModel = require("./article")

mongoose.connect("mongodb://127.0.0.1:27017/MongoTeste", {useNewUrlParser: true, useUnifiedTopology: true})

const Article = mongoose.model("Article", articleModel)

Article.findByIdAndUpdate("6504b8f96ab91ff50b6a7354", { 
    title: "Vue do zero!", 
    author: "Zézinho", 
    body: "É isso ai rapaz..." 
}).then(() => {
    console.log('Dados atualizados com sucesso! ;)')
}).catch(err => {
    console.log(err)
})




// Deletando dados
/* Article.findByIdAndDelete("6504ae061ddd9ccf0f5f2d3b").then(() => {
    console.log("Dado removido")
}).catch(err => {
    console.log(err)
}) */

// Buscando dados únicos
/*Article.findOne({'resume.author' : 'lol' }).then(article => {
    console.log(article)
}).catch(err => {
    console.log(err)
})*/

// Buscando dados com critérios
/* Article.find({'resume.author' : 'Diego' }).then(article => {
    console.log(article)
}).catch(err => {
    console.log(err)
})
*/

// Buscando dados gerais
/*
Article.find({

}).then(articles => {
    console.log(articles)
}).catch(err => {
    console.log(err);
})
*/

// Cadastrando dados
/*
const artigo = new Article({
    title: "Título 1", 
    author: "Diego Max", 
    body: "Este é o corpo do documento",
    special: true,
    resume: {
        content: "blabla blabla bla",
        author: "Diego"
    }
})

artigo.save().then(() => {
    console.log("Artigo salvo!")
}).catch(err => {
    console.log(err);
})
*/