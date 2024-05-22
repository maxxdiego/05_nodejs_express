import express from "express"
import Cliente from "../models/Cliente.js"
import Auth from "../middleware/Auth.js"
const router = express.Router()


// ROTA CLIENTES
router.get("/clientes", Auth, function(req, res){
    Cliente.findAll().then(clientes => {
        res.render("clientes", {
            clientes: clientes
        })
    })
})

// ROTA DE CADASTRO DE CLIENTES
router.post("/clientes/new", (req, res) => {
    const nome = req.body.nome
    const cpf = req.body.cpf
    const endereco = req.body.endereco
    Cliente.create({
        nome : nome,
        cpf : cpf,
        endereco : endereco
    }).then(() => {
        res.redirect("/clientes")
    })
})

// ROTA DE EXCLUSÃO DE CLIENTES
router.get("/clientes/delete/:id", (req, res) => {
    const id = req.params.id
    Cliente.destroy({
        where: {
            id : id
        }
    }).then(() => {
        res.redirect("/clientes")
    })
})

// ROTA DE EDIÇÃO DE CLIENTES
router.get("/clientes/edit/:id", (req, res) => {
    const id = req.params.id
    Cliente.findByPk(id).then(function(cliente) {
        res.render("clienteEdit", {
            cliente : cliente
        })
    })
})

// ROTA DE ALTERAÇÃO DE CLIENTES
router.post("/clientes/update/:id", (req, res) => {
    const id = req.body.id
    const nome = req.body.nome
    const cpf = req.body.cpf
    const endereco = req.body.endereco
    Cliente.update(
        {
            nome : nome,
            cpf : cpf,
            endereco : endereco
        },
        {where: {id : id}}
    ).then(() => {
        res.redirect("/clientes")
    })
})

export default router //exportando o módulo "router"