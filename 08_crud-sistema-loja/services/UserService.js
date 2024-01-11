import user from "../models/Users.js"
import mongoose from "mongoose"

const User = mongoose.model("User", user)

class UserService {
    Create(email, password) {
        const newUser = new User({
            email: email,
            password: password
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
}

export default new UserService()