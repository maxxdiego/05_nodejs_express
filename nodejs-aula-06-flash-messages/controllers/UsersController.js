import express from "express"
import bcrypt from "bcrypt"
const router = express.Router()
import UserService from "../services/UserService.js"

// ROTA DE LOGIN
router.get("/login", (req, res) => {
    res.render("login", {
        loggedOut: true,
        messages: req.flash()
    })
})

// ROTA DE LOGOUT
router.get("/logout", (req, res) => {
    req.session.user = undefined
    res.redirect("/")
})

// ROTA DE AUTENTICAÇÃO
router.post("/authenticate", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    //BUSCA O USUÁRIO NO BANCO
    UserService.SelectOne(email).then(user => {
        // SE O USUÁRIO EXISTIR
        if (user != undefined){
            // VALIDA SENHA
            const correct = bcrypt.compareSync(password, user.password)
            // SE A SENHA FOR VÁLIDA
            if(correct){
                // AUTORIZA LOGIN
                req.session.user = {
                    id : user._id,
                    email : user.email
                }
                // RESPOSTA ENVIADA APÓS O LOGIN
                // res.send(`Usuário logado: <br> ID: ${req.session.user['id']} <br> E-mail: ${req.session.user['email']}`)
                req.flash('success', 'Login efetuado com sucesso!')
                res.redirect("/")
            // SE A SENHA FOR INCORRETA
            } else {
                req.flash('danger', 'A senha informada está incorreta! Tente novamente.')
                res.redirect("/login")
            }
        // SE O USUÁRIO NÃO EXISTIR    
        } else {
            req.flash('danger', 'O usuário informado não existe! Verifique os dados digitados.')
            res.redirect("/login")
        }
    })
})

// ROTA DE CADASTRO
router.get("/cadastro", (req, res) => {
    res.render("cadastro", {
        loggedOut: true,
        messages: req.flash()
    })
    
})

// ROTA DE CRIAÇÃO DE USUÁRIO NO BANCO
router.post("/createUser", (req, res) => {
    // Coletando as informações do corpo da requisição
    const email = req.body.email
    const password = req.body.password
    // VERIFICAR SE O USUÁRIO JÁ ESTÁ CADASTRADO NO BANCO
    UserService.SelectOne(email).then(user => {
        // SE O USUÁRIO NÃO EXISTIR
        if (user == undefined) {
        // AQUI SERÁ FEITO O CADASTRO
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        UserService.Create(email, hash)
        res.redirect("/login")
        } else {
            req.flash('danger', 'O usuário já está cadastrado! Faça o login.')
            res.redirect("/cadastro")
        }
    })
})

export default router