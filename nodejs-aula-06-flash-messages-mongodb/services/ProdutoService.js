import mongoose from "mongoose"
import produto from "../models/Produto.js"

const Produto = mongoose.model("Produto", produto)

class ProdutoService {
    // Método para SELECIONAR TODOS os Produtos no banco
    SelectAll() {
        const produtos = Produto.find()
        return produtos
    }
}

export default new ProdutoService()