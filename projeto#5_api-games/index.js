import express from 'express'
import GameService from './services/GameService.js'
import UserService from './services/UserService.js'
import mongoose from 'mongoose'
import {ObjectId} from 'mongodb'
import cors from 'cors'
import jwt from 'jsonwebtoken'
const app = express()
const JWTSecret = 'apigamessecret'

// Função de Autenticação (JWT - Json Web Token)
function Auth(req, res, next) {
    const authToken = req.headers['authorization']
    if(authToken != undefined){
        const bearer = authToken.split(' ')
        var token = bearer[1]
        jwt.verify(token, JWTSecret,(err, data) => {
            if(err){
                res.status(401)
                res.json({err:"Token inválido!"})
            }else{
                req.token = token
                req.loggedUser = {
                    id: data.id,
                    email: data.email
                }
                next()
            }
        })
    }else{
        res.status(401)
        res.json({err:"Token inválido"})
    }
}

// Configurações do Express
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

// Iniciando conexão com o banco de dados do MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/games")

//Listando todos os Games
app.get("/games", Auth, (req,res) => {
    res.statusCode = 200 //Requisição feita com sucesso
    GameService.GetAll().then(games => {
        res.json({games: games})
    })
})

//Listando um único Game
app.get("/game/:id", Auth, (req,res) => {
    if(ObjectId.isValid(req.params.id)){
        const id = req.params.id

        GameService.GetOne(id).then(game => {
            if(game != undefined){
                res.statusCode = 200
                res.json({game: game})
            }else{
                res.sendStatus(404)
            }
        }) 
    }else{
        res.sendStatus(400) //Requisição inválida - Bad request
    }
})

//Cadastrando um Game
app.post("/game", Auth, (req,res) => {
    const {title, year, price} = req.body
    GameService.Create(title, year, price)
    res.sendStatus(200)
})

//Deletando um Game
app.delete("/game/:id", Auth, (req,res) => {
    if(ObjectId.isValid(req.params.id)){
        const id = req.params.id
        GameService.Delete(id)
        res.sendStatus(200)
    }else{
        res.sendStatus(400) //Bad request
    }
})

//Alterando um Game
app.put("/game/:id", Auth, (req,res) => {
    if(ObjectId.isValid(req.params.id)){
        const id = req.params.id
        let {title, price, year} = req.body
        GameService.Update(id, title, year, price)
        res.sendStatus(200)
    }else{
        res.sendStatus(400) //Requisição inválida - Bad request
    }
})

// Endpoint de Login
app.post("/auth", (req, res) => {
    const {email, password} = req.body
    if(email != undefined){
        UserService.GetOne(email).then(user => {
            if(user != undefined){
                if(user.password == password){
                    jwt.sign({id: user._id, email: user.email}, JWTSecret, {expiresIn:'48h'}, (err, token) => {
                        if(err){
                            res.status(400)
                            res.json({err: "Falha interna"})
                        }else{
                            res.status(200)
                            res.json({token: token})
                        }
                    })
                }else{
                    res.status(401)
                    res.json({err: "Credenciais inválidas!"})
                }
            }else{
                res.status(404)
                res.json({err: "O e-mail enviado não foi encontrado."})
            }
        }).catch(err => {
            res.json({"Erro" : "Ocorreu um erro."})
        })
    }else{
        res.status(400)
        res.json({err: "O e-mail enviado é inválido."})
    }  
})

// Rodando a API na porta 4000
const port = 4000
app.listen(port,() => {
    console.log(`API rodando na porta ${port}.`)
})