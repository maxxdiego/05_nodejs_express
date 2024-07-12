import express from 'express'
const gameRoutes = express.Router()
import gameController from '../controllers/gameController.js'

// Endpoint para listar todos os Games
gameRoutes.get("/games", gameController.getAllGames) 

// Endpoint para cadastrar um Game
gameRoutes.post("/game", gameController.createGame) 

// Endpoint para deletar um Game
gameRoutes.delete("/game/:id", gameController.deleteGame) 

// Endpoint para alterar um Game
gameRoutes.put("/game/:id", gameController.updateGame) 

// Endpoint para listar um único Game
gameRoutes.get("/game/:id", gameController.getOneGame) 

export default gameRoutes