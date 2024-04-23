import express from 'express'
import multer from 'multer'
const app = express()
// import path from 'path'

app.use(express.static('public'))

app.set('view engine', 'ejs')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/uploads/")
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname + Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({storage})

const upload = multer({dest: "public/uploads/"})

app.get("/", (req, res) => {
    res.render('index')
})

app.post("/upload", upload.single("file"), (req, res) => {
    res.send("Arquivo recebido!")
})


const port = 8080

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`)
})