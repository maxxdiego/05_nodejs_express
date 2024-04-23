import mongoose from "mongoose"

const pedido = new mongoose.Schema({
    numero: Number,
    valor: Number,
})

export default pedido