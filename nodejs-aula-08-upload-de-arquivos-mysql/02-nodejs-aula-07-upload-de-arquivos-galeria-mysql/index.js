// Importando o express
import express from "express"
// Importando o multer
import multer from "multer"
// Importando o Sequelize
import connection from "./config/sequelize-config.js" 
// Importando o model
import Galeria from "./models/Galeria.js"

const app = express()
const upload = multer({dest: "public/uploads/"})

app.use(express.static('public'))
app.set('view engine', 'ejs')

// Realizando a conexão com o banco de dados
connection.authenticate().then(()=> {
    console.log("Conexão com o banco de dados feita com sucesso!")
}).catch((error) => {
    console.log(error)
})

// Criando o banco de dados se ele não existir
connection.query(`CREATE DATABASE IF NOT EXISTS galeria;`).then(() => {
    console.log("O banco de dados está criado.")
}).catch((error) => {
    console.log(error)
})

// ROTA PRINCIPAL
app.get("/", (req, res) => {
    Galeria.findAll().then(imagens => {
        res.render("index", {
            imagens : imagens
        })
    })
})

// ROTA DE UPLOAD
app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file.filename
    Galeria.create({
        file : file 
    })
    res.redirect("/")
})

const port = 8080

app.listen(port, (error) => {
    if (error) {
        console.log(`Ocorreu um erro! ${error}`)
    } else {
        console.log(`Servidor rodando em http://localhost:${port}.`)
    }
})