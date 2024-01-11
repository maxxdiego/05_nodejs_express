import client from "../models/Clients.js"
import mongoose from "mongoose"

const Client = mongoose.model("Client", client)

class ClientService {
    Create(name, cpf, address) {
        const newClient = new Client({
            name: name,
            cpf: cpf,
            address: address
        })
        newClient.save()
    }
    
    GetAll() {
        const clients = Client.find()
        return clients
    }

    GetOne(id) {
        const client = Client.findOne({_id: id})
        return client
    }

    Delete(id) {
        Client.findByIdAndDelete(id).then(() => {
            console.log(`Cliente com a id: ${id} foi deletado.`)
        }).catch(err => {
            console.log(err)
        })
    }

    Update(id, name, cpf, address) {
        Client.findByIdAndUpdate(id, {
            name: name,
            cpf: cpf,
            address: address
        }).then(() => {
            console.log(`Dados do cliente com id: ${id} alterados com sucesso.`)
        }).catch(err => {
            console.log(err)
        })
    }
}

export default new ClientService()
