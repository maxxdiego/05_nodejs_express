import mongoose from 'mongoose'

const user = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

export default user
