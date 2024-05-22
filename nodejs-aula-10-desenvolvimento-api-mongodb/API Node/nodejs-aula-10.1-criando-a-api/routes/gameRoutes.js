import express from 'express'
const gameRoutes = express.Router()
import gameController from '../controllers/gameController.js'

// Endpoint para listar todos os games
gameRoutes.get("/games", gameController.getAllGames) 

export default gameRoutes