import gameService from '../services/gameService.js'
import {ObjectId} from 'mongodb'

// Listando todos os games
const getAllGames = async (req, res) => {
    try {
        const games = await gameService.getAll()
            res.status(200).json({ games: games }) //Código 200 (OK) : Requisição feita com sucesso.
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // Erro interno do servidor
    }
}

//Cadastrando um Game
const createGame = async (req, res) => {
    try {
        const {title, year, price} = req.body
        await gameService.Create(title, year, price)
        res.sendStatus(201) //Código 201 (CREATED) : Requisição bem sucedida, novo recurso criado no servidor
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // Erro interno do servidor
    }
}

//Deletando um Game
const deleteGame = async (req, res) => {
    try {
        if(ObjectId.isValid(req.params.id)){
            const id = req.params.id
            gameService.Delete(id)
            res.sendStatus(204) // Código 204 (NO CONTENT) : Requisição bem sucedida, mas não há conteúdo para retornar ao cliente.
        }else{
            res.sendStatus(400) // Código 400 (BAD REQUEST) : Requisição feita pelo cliente é inválida, geralmente devido a dados malformados ou ausentes.
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // Erro interno do servidor
    }
}

//Alterando um Game
const updateGame = async (req, res) => {
    try {
        if(ObjectId.isValid(req.params.id)){
            const id = req.params.id
            const {title, price, year} = req.body
            gameService.Update(id, title, year, price)
            res.sendStatus(200) //Código 200 (OK) : Requisição feita com sucesso.
        }else{
            res.sendStatus(400) //Código 400 (BAD REQUEST) : Requisição inválida
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // Erro interno do servidor
    }
}

//Listando um único Game
const getOneGame = async (req, res) => {
    try {
        if (ObjectId.isValid(req.params.id)) {
            const id = req.params.id
            const game = await gameService.getOne(id)
            if (!game) {
                res.sendStatus(404) // Jogo não encontrado
            } else {
                res.status(200).json({ game })
            }
        } else {
            res.sendStatus(400) // Requisição inválida - Bad request
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // Erro interno do servidor
    }
}

export default { getAllGames, createGame, deleteGame, updateGame, getOneGame }