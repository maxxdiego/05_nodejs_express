import mongoose from 'mongoose'

const user = new mongoose.Schema({
    email: String,
    password: String
})

export default user