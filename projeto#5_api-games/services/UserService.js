import user from "../models/Users.js"
import mongoose from "mongoose"

const User = mongoose.model("User", user)

class UserService {
    Create(name, email, password) {
        const newUser = new User({
            title,
            year,
            price
        })
        newUser.save()
    }
    
    GetAll() {
        const users = User.find()
        return users
    }

    GetOne(email) {
        const user = User.findOne({email: email})
        return user
    }

    Delete(id) {
        User.findByIdAndDelete(id).then(() => {
            console.log(`User com a id: ${id} foi deletado.`)
        }).catch(err => {
            console.log(err)
        })
    }

    Update(name, email, password) {
        User.findByIdAndUpdate(id, {
            name,
            email,
            password
        }).then(() => {
            console.log(`Dados do usuário com id: ${id} alterados com sucesso.`)
        }).catch(err => {
            console.log(err)
        })
    }
}

// Função para criar a coleção e inserir um registro de usuário padrão
async function criarColecaoEInserirRegistroPadrao() {
    try {
        // Verifica se a coleção já existe
        const existeColecao = await User.exists();
        
        if (!existeColecao) {
            // Cria um novo usuário padrão
            const novoUsuario = new User({
                name: 'Admin',
                email: 'admin@email.com',
                password: 'admin'
            });

            // Salva o novo usuário no banco de dados
            await novoUsuario.save();
            
            console.log('Registro de usuário padrão inserido com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao criar coleção e inserir registro de usuário padrão:', error);
    } 
}

// Chama a função para criar a coleção e inserir o registro padrão
criarColecaoEInserirRegistroPadrao();

export default new UserService()