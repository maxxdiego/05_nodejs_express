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

// ROTA DE CADASTRO DE CLIENTES
router.post("/clientes/new", (req, res) => {
  ClienteService.Create(
    req.body.nome, 
    req.body.cpf, 
    req.body.endereco
    )
  res.redirect("/clientes");
})

// ROTA DE EXCLUSÃO DE CLIENTE
router.get("/clientes/delete/:id", (req, res) => {
  const id = req.params.id
  ClienteService.Delete(id)
  res.redirect("/clientes")
})

export default router //exportando o módulo "router"