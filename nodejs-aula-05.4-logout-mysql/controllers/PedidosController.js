import express from "express"
const router = express.Router()
// Importando o middleware de autenticação
import Auth from "../middleware/Auth.js"

// ROTA PEDIDOS
router.get("/pedidos",  Auth, function(req,res){
    const pedidos = [
        {numero: "983721931", valor: 1200},
        {numero: "983721932", valor: 900},
        {numero: "983721933", valor: 3200},
        {numero: "983721934", valor: 150}
    ]
    res.render("pedidos", {
        pedidos: pedidos
    })

})

export default router

