import mongoose from "mongoose"

// Definindo o subesquema de endereço
const endereco = new mongoose.Schema({
    rua: { type: String, required: true },
    numero: { type: Number, required: true },
    bairro: { type: String, required: true }
  });


// Definindo o esquema do cliente e incorporando o subesquema de endereço
const cliente = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true },
    enderecos: [endereco], // Referenciando o subesquema aqui
})

export default cliente