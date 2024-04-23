import express from "express"
const router = express.Router()
import ProdutoService from "../services/ProdutoService.js"
import Auth from "../middleware/Auth.js"

// ROTA PRODUTOS
router.get("/produtos", Auth, function(req, res){
    ProdutoService.SelectAll().then((produtos) =>{
        res.render("produtos", {
            produtos : produtos
        })
    })
})

export default router