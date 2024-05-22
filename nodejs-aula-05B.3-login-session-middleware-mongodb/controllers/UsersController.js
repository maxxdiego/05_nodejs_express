import express from "express"
const router = express.Router()
import UserService from "../services/UserService.js"
// Importando bcrypt (hash de senha)
import bcrypt from "bcrypt"

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

  // VERIFICA SE O USUÁRIO JÁ ESTÁ CADASTRADO NO BANCO
  UserService.SelectOne(email).then(user => {
    // SE NÃO HOUVER
    if(user == undefined){
      // AQUI SERÁ FEITO O CADASTRO
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      UserService.Create(email, hash)
      res.redirect("/login")

    // CASO JÁ EXISTA UM USUÁRIO CADASTRADO COM O MESMO E-MAIL
    } else {
      res.send(`Usuário já cadastrado!
      <br><a href="/login">Tentar novamente.</a>`)
    }
  })
})

// ROTA DE AUTENTICAÇÃO
router.post("/authenticate", (req, res) => {
  const email = req.body.email
  const password = req.body.password

  // BUSCA O USUÁRIO NO BANCO
  UserService.SelectOne(email).then(user => {
    // SE O USUÁRIO EXISTIR
    if (user != undefined) { 
      // VALIDA A SENHA
      const correct = bcrypt.compareSync(password, user.password)
      // SE A SENHA FOR VÁLIDA
      if(correct){
        // AUTORIZA O LOGIN
        req.session.user = {
          id: user._id,
          email: user.email
        }
        // res.send(`Usuário logado:<br> ID: ${req.session.user['id']} <br> E-mail: ${req.session.user['email']}`)
        res.redirect("/")
      // SE A SENHA NÃO FOR VÁLIDA
      } else {
        // EXIBE A MENSAGEM
        res.send(`Senha inválida!
        <br><a href="/login">Tentar novamente.</a>`)
      }
    // SE O USÁRIO NÃO EXISTIR
    } else {
      // EXIBE A MENSAGEM
      res.send(`Usuário não existe.
      <br><a href="/login">Tentar novamente.</a>`)
    }
  })
})

export default router