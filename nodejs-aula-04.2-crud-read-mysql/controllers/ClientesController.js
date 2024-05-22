import express from "express"
import Cliente from "../models/Cliente.js"
const router = express.Router()

// ROTA CLIENTES
router.get("/clientes", function(req, res){
    Cliente.findAll().then(clientes => {
        res.render("clientes", {
            clientes: clientes
        })
    })
})

export default router //exportando o módulo "router"