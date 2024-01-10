import mongoose from 'mongoose'

const client = new mongoose.Schema({
    name: String,
    cpf: String,
    address: String,
})

export default client