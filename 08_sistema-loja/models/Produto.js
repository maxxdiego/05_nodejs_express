import mongoose from 'mongoose'

const produtos = new mongoose.Schema({
    nome: String,
    preco: Number,
    categoria:String
})

export default produtos