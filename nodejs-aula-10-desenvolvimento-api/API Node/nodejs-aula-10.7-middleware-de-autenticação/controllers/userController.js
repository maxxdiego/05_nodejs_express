import userService from '../services/userService.js'
import jwt from 'jsonwebtoken'
const JWTSecret = 'apigamessecret'

//Cadastrando um Usuário
const createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        await userService.Create(name, email, password)
        res.sendStatus(201) //Código 201 (CREATED) : Requisição bem sucedida, novo recurso criado no servidor
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // Erro interno do servidor
    }
}

// Função para LOGIN do Usuário
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        // E-mail válido
        if(email != undefined){
            const user = await userService.getOne(email)
                // Usuário encontrado
                if(user != undefined){
                    // Senha correta
                    if(user.password == password){
                        jwt.sign({id: user._id, email: user.email}, JWTSecret, {expiresIn:'48h'}, (err, token) => {
                            if(err){
                                res.status(400) // Bad request
                                res.json({err: "Falha interna"})
                            }else{
                                res.status(200) // OK
                                res.json({token: token})
                            }
                        })
                    // Senha incorreta
                    }else{
                        res.status(401) // Unauthorized
                        res.json({err: "Credenciais inválidas!"})
                    }
                // Usuário não encontrado
                }else{
                    res.status(404) // Not Found
                    res.json({err: "O e-mail enviado não foi encontrado."})
                }
        // E-mail inválido
        }else{
            res.status(400) // Bad request
            res.json({err: "O e-mail enviado é inválido."})
        }  
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // Internal Server Error
    }
}

export default { createUser, loginUser, JWTSecret }