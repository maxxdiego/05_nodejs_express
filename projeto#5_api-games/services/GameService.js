import game from "../models/Games.js"
import mongoose from "mongoose"

const Game = mongoose.model("Game", game)

class GameService {
    Create(title, year, price) {
        const newGame = new Game({
            title,
            year,
            price
        })
        newGame.save()
    }
    
    GetAll() {
        const games = Game.find()
        return games
    }

    GetOne(id) {
        const game = Game.findOne({_id: id})
        return game
    }

    Delete(id) {
        Game.findByIdAndDelete(id).then(() => {
            console.log(`Game com a id: ${id} foi deletado.`)
        }).catch(err => {
            console.log(err)
        })
    }

    Update(id, title, year, price) {
        Game.findByIdAndUpdate(id, {
            title,
            year,
            price
        }).then(() => {
            console.log(`Dados do game com id: ${id} alterados com sucesso.`)
        }).catch(err => {
            console.log(err)
        })
    }
}

export default new GameService()