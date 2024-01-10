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

export default new UserService()