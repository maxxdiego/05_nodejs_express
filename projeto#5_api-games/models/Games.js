import mongoose from 'mongoose'

const game = new mongoose.Schema({
    title: String,
    year: Number,
    price: Number
})

export default game