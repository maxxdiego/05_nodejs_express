import mongoose from 'mongoose'

const pedidos = new mongoose.Schema({
    numero: String,
    valor: Number
})

export default pedidos