const express = require("express")
const router = express.Router()
const User = require("./User")
const bcrypt = require('bcryptjs')

router.get("/admin/users", (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {users: users})
    })
})

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create")
})

router.post("/users/create", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({where: {email: email}}).then(user => {
        if(user == undefined){
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/")
            }).catch((err) => {
                res.redirect("/")
            })

        }else{
            res.send(`Já existe um usuário cadastrado com o e-mail informado. <br> <a href="javascript:window.history.back()">Voltar</a>`)
        }
    })
})

router.get("/cms", (req, res) => {
    res.render("./admin/users/login")
})

router.get("/login", (req, res) => {
    res.render("admin/users/login")
})

router.post("/authenticate", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({where: {email: email}}).then(user => {
        if(user != undefined) { // Se existe um usuário com esse e-mail
            // Validar senha
            const correct = bcrypt.compareSync(password, user.password)
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles")
            }else{
                res.send(`A senha informada está incorreta! <br> <a href="javascript:window.history.back()">Tentar novamente</a>`)
            }

        }else{
            res.send(`O usuário informado está incorreto! <br> <a href="javascript:window.history.back()">Tentar novamente</a>`)
        }
    })
})

router.get("/logout", (req, res) => {
    req.session.user = undefined
    res.redirect("/")
})

module.exports = router