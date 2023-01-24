// CONFIG INICIAL
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

console.log(process.env.DB_USER) 

//FORMA DE LER JSON/ MIDDLEWARES
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

// rotas da API
const clienteRoutes = require('./routes/clienteRoutes')

app.use('/cliente', clienteRoutes)

//ROTA INICIAL // ENDPOINT
app.get('/', (req, res) => {
 
    res.json({ message: 'Cadastro ao usuário!' })
})

//ENTREGAR UMA PORTA
const DB_USER = 'casa'
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.set("strictQuery", true);
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.jch7kjq.mongodb.net/?retryWrites=true&w=majority`)
.then( () =>{
    console.log("Conectamos ao MongoDB!")
    app.listen(3000)
})
.catch((err) => console.log(err))
