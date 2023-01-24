const mongoose = require('mongoose')
 
const Cliente = mongoose.model('Cliente', {
    name: String,
    CPF: Number,
    dataNascimento: Number
})
 
module.exports = Cliente 