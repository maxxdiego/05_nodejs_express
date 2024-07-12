import express from 'express'
const app = express()
import mongoose from 'mongoose'
import cors from 'cors'

import gameRoutes from './routes/gameRoutes.js'
import userRoutes from './routes/userRoutes.js'

// Configurações do Express
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use('/', gameRoutes)
app.use('/', userRoutes)


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