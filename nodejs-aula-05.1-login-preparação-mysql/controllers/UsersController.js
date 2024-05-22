import express from "express"
import User from "../models/User.js"
const router = express.Router()


// ROTA DE LOGIN
router.get("/login", (req, res) => {
    res.render("login")
  })

// ROTA DE CADASTRO DE USUÁRIO
router.get("/cadastro", (req, res) => {
    res.render("cadastro")
  })

// ROTA DE CRIAÇÃO DE USUÁRIO NO BANCO
router.post("/createUser", (req, res) => {
  // COLETANDO INFORMAÇÕES DO CORPO DA REQUISIÇÃO
  const email = req.body.email
  const password = req.body.password
  User.create({
    email : email,
    password : password,
  }).then(() => {
    res.redirect("/login")
  })
})

export default router
