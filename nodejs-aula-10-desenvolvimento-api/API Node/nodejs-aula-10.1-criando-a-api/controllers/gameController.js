import gameService from '../services/gameService.js'

const getAllGames = async (req, res) => {
    try {
        const games = await gameService.getAll()
            res.status(200).json({ games: games }) //Código 200 (OK) : Requisição feita com sucesso.
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro interno do servidor.'})
        //Código 500 (Internal Server Error) : Erro interno do servidor.
    }
}
export default { getAllGames }