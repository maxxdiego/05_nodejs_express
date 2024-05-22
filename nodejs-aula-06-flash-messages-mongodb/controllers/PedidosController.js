import express from "express"
const router = express.Router()
import PedidoService from "../services/PedidoService.js"
import Auth from "../middleware/Auth.js"

// ROTA PEDIDOS
router.get("/pedidos", Auth, function(req, res){
    PedidoService.SelectAll().then((pedidos) =>{
        res.render("pedidos", {
            pedidos : pedidos
        })
    })
})

export default router

