import express from "express"
import User from "../models/User.js"
const router = express.Router()
// Importando bcrypt (hash de senha)
import bcrypt from "bcrypt" 

// ROTA DE LOGIN
router.get("/login", (req, res) => {
  res.render("login",{
    loggedOut: true,
    messages: req.flash()
  })
})

// ROTA DE LOGOUT
router.get("/logout", (req, res) => {
  req.session.user = undefined
  res.redirect("/")
})

// ROTA DE CADASTRO DE USUÁRIO
router.get("/cadastro", (req, res) => {
  res.render("cadastro",{
    loggedOut: true,
    messages: req.flash()
  })
})

// ROTA DE CRIAÇÃO DE USUÁRIO NO BANCO
router.post("/createUser", (req, res) => {
  // COLETANDO INFORMAÇÕES DO CORPO DA REQUISIÇÃO
  const email = req.body.email
  const password = req.body.password

  // VERIFICA SE O USUÁRIO JÁ ESTÁ CADASTRADO NO BANCO
  User.findOne({where: {email : email}}).then(user => {
    // SE NÃO HOUVER
    if(user == undefined){
      // AQUI SERÁ FEITO O CADASTRO
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      User.create({
        email : email,
        password : hash,
      }).then(() => {
        res.redirect("/login")
      })

    // CASO JÁ EXISTA UM USUÁRIO CADASTRADO COM O MESMO E-MAIL
    } else {
      req.flash('danger', 'O usuário já está cadastrado! Faça o login.')
      res.redirect("/cadastro")
    }
  })
})

// ROTA DE AUTENTICAÇÃO
router.post("/authenticate", (req, res) => {
  const email = req.body.email
  const password = req.body.password

  // BUSCA O USUÁRIO NO BANCO
  User.findOne({where: {email : email}}).then(user => {
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
        // RESPOSTA ENVIADA APÓS O LOGIN
        req.flash('success', 'Login efetuado com sucesso!')
        res.redirect("/")
      // SE A SENHA NÃO FOR VÁLIDA
      } else {
        // EXIBE A MENSAGEM
        req.flash('danger', 'A senha informada está incorreta! Tente novamente.')
        res.redirect("/login")
      }
    // SE O USÁRIO NÃO EXISTIR
    } else {
      // EXIBE A MENSAGEM
      req.flash('danger', 'O usuário informado não existe! Verifique os dados digitados.')
      res.redirect("/login")
    }
  })
})

export default router