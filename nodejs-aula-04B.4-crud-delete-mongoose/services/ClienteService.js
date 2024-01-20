import cliente from "../models/Cliente.js"
import mongoose from "mongoose"

const Cliente = mongoose.model("Cliente", cliente)

class ClienteService {
    // Método para SELECIONAR TODOS os Clientes no banco
    SelectAll() {
        const clientes = Cliente.find()
        return clientes
    }

    // Método para CADASTRAR um Cliente
    Create(nome, cpf, endereco) {
        const novoCliente = new Cliente({
            nome: nome,
            cpf: cpf,
            endereco: endereco
        })
        novoCliente.save()
    }

    // Método para EXCLUIR um Cliente
    Delete(id) {
        Cliente.findByIdAndDelete(id).then(() => {
            console.log(`Cliente com a id: ${id} foi deletado.`)
        }).catch(err => {
            console.log(err)
        })
    }
}

export default new ClienteService()