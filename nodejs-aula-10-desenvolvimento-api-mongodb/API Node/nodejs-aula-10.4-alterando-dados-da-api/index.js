import express from 'express'
import mongoose from 'mongoose'
const app = express()

import gameRoutes from './routes/gameRoutes.js'

// Configurações do Express
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/', gameRoutes)

// Iniciando conexão com o banco de dados do MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/apinode-games")

// Rodando a API na porta 4000
const port = 4000
app.listen(port, (error) => {
    if(error) {
        console.log(error)
    }
    console.log(`API rodando em http://localhost:${port}.`)
})