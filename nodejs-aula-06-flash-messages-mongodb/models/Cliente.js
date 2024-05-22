import mongoose from "mongoose"

const cliente = new mongoose.Schema({
    nome: String,
    cpf: String,
    endereco: String
})

export default cliente