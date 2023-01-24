// ROTAS DA API
const router = require('express').Router();

const Cliente = require('../models/Cliente')

//CREATE - CRIAÇÃO DE DADOS
router.post('/', async (req, res) => {
    
    // {name:"rayenne", CPF: 098.134.114-00, dataNascimento: 25/08/1995}
    const {name, CPF, dataNascimento} = req.body

    if(!name) {
        res.status(422).json({ error: 'O nome é obrigatório!' })
        return
    }
    
    if(!CPF) {
        res.status(422).json({ error: 'O CPF é obrigatório!' })
        return
    }

    if(!dataNascimento) {
        res.status(422).json({ error: 'A data de nascimento é obrigatória!' })
        return
    }

    const cliente = {
       name,
       CPF,
       dataNascimento
    }

   try {
        //criando dados
   await Cliente.create(cliente)
    
   res.status(201).json({ message: 'Pessoa inserida com sucesso!'})
    
   }catch(error) {
    res.status(500).json({ error:error })
   }
    
   })
   
   //READ -LEITURA DE DADOS
   router.get('/', async (req,res) => {

    try {
        
    const clientes = await Cliente.find()
    res.status(200).json(clientes)

    } catch (error) {
      res.status(500).json({ error: error })
    }
   })

   router.get('/:id', async (req,res)=> {
   console.log(req)

   // EXTRAIR O DADO DA REQUISIÇÃO, PELA URL= REQ.PARAMS
    const id = req.params.id

    try {

    const cliente = await Cliente.findOne({_id: id })
    if(!cliente) {
     res.status(422).json({ message: 'O usuário não foi encontrado!'})
    return
    }

    res.status(200).json(cliente)

    }catch (error) {
        res.status(500).json({ error: error })
    }
    })

    //update -ATUALIZAÇÃO DE DADOS (PUT,PATCH)

    router.patch('/:id', async(req,res) => {
    const id = req.params.id
    const {name, CPF, dataNascimento} = req.body

    const cliente = {
        name,
        CPF,
        dataNascimento,
    }

    try {

    const updatedCliente = await Cliente.updateOne({ _id: id }, cliente)
    
    console.log(updatedCliente)

    if(updatedCliente.matchedCount === 0){
        res.status(422).json({ message: 'O usuário não foi encontrado!'})
        return
    }
    res.status(200).json(cliente)
      } catch(error) {
        res.status(500).json({ error: error })
    }
})

// DELETE - Deletar Dados
router.delete('/:id', async (req,res) => {
    const id = req.params.id

    const cliente = await Cliente.findOne({_id: id })

    if(!cliente) {
     res.status(422).json({ message: 'O usuário não foi encontrado!'})
    return
    }
    try {

     await Cliente.deleteOne({_id: id})

     res.status(200).json({ message: 'Usuário removido com sucesso!'})
    }catch(error) {
        res.status(500).json({ error: error })
    }
})
 module.exports = router;