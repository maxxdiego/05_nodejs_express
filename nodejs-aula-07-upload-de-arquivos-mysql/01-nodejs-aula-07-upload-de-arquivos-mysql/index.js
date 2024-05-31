import express from 'express'
import multer from 'multer'
const app = express()

app.use(express.static('public'))

app.set('view engine', 'ejs')

const upload = multer({dest: "public/uploads/"})

app.get("/", (req, res) => {
    res.render('index')
})

app.post("/upload", upload.single("file"), (req, res) => {
    res.send("Arquivo recebido!")
})


const port = 8080

app.listen(port, (error) => {
    if (error) {
        console.log(`Ocorreu um erro! ${error}`)
    } else {
        console.log(`Servidor rodando em http://localhost:${port}.`)
    }
    
})