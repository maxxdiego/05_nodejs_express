import mongoose from "mongoose"
import cliente from "../models/Cliente.js"

const Cliente = mongoose.model("Cliente", cliente)

class ClienteService {
    // Método para SELECIONAR TODOS os Clientes no banco
    SelectAll() {
        const clientes = Cliente.find()
        return clientes
    }

    // Método para CADASTRAR um Cliente
    Create(nome, cpf, enderecos) {
        const novoCliente = new Cliente({
            nome : nome,
            cpf : cpf,
            enderecos : enderecos
        })
        novoCliente.save()
    }

    // Método para EXCLUIR um Cliente
    Delete(id) {
        Cliente.findByIdAndDelete(id).then(() => {
            console.log(`Cliente com a id: ${id} foi deletado com sucesso.`)
        }).catch(err => {
            console.log(err)
        })
    }

    // Método para SELECIONAR um cliente ÚNICO
    SelectOne(id){
        const cliente = Cliente.findOne({_id : id})
        return cliente
    }

    // Método para ALTERAR um cliente
    Update(id, nome, cpf, enderecos) {
        Cliente.findByIdAndUpdate(id, {
            nome : nome,
            cpf : cpf,
            enderecos : enderecos
        }).then(() => {
            console.log(`Dados do cliente com id: ${id} alterados com sucesso!`)
        }).catch(err => {
            console.log(err)
        })
    }
}

export default new ClienteService()