import Game from "../models/Games.js"

class gameService {
   
    async getAll() {
        try {
            const games = await Game.find()
            return games
        } catch (error) {
            console.log(error)
        }
    }

    async Create(title, year, price) {
        try{
            const newGame = new Game({
                title,
                year,
                price
            })
            await newGame.save()
        } catch (error) {
            console.log(error)
        }
    }

    async Delete(id) {
        try {
            await Game.findByIdAndDelete(id);
            console.log(`Game com a id: ${id} foi deletado.`)
        } catch (error) {
            console.log(error)
        }
    }
}

export default new gameService()