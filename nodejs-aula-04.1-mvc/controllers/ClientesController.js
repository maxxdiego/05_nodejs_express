import express from "express"
const router = express.Router()

// ROTA CLIENTES
router.get("/clientes", function(req, res){
    res.render("clientes")
})

export default router //exportando o módulo "router"