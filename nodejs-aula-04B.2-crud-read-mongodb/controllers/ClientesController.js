import express from "express"
const router = express.Router()
import ClienteService from "../services/ClienteService.js"

// ROTA CLIENTES
router.get("/clientes", (req, res) => {
    ClienteService.SelectAll().then((clientes) => {
      res.render("clientes", {
        clientes: clientes,
      })
    })
  })

export default router //exportando o módulo "router"