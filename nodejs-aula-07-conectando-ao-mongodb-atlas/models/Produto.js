import mongoose from "mongoose"

const produto = new mongoose.Schema({
    nome: String,
    preco: Number,
    categoria: String
})

export default produto