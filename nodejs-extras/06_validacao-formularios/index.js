import express from 'express'
import session from 'express-session'
import flash from 'express-flash'
import cookieParser from 'cookie-parser'
var app = express()

app.set('view engine', 'ejs')

app.use(express.static ('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(cookieParser('secretecookie'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

app.use(flash())

app.get('/',(req,res) => {
    var emailError = req.flash('emailError')
    var nomeError = req.flash('nomeError')
    var pontosError = req.flash('pontosError')
    var email = req.flash('email')
    var nome = req.flash('nome')
    var pontos = req.flash('pontos')
    

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError
    nomeError = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError
    pontosError = (pontosError == undefined || pontosError.length == 0) ? undefined : pontosError

    email = (email == undefined || email.length == 0) ? '' : email
    nome = (nome == undefined || nome.length == 0) ? '' : nome
    pontos = (pontos == undefined || pontos.length == 0) ? '' : pontos

    res.render('index', {emailError, nomeError, pontosError, email: email, nome: nome, pontos: pontos})
})

app.post('/form', (req, res) => {
    const {email, nome, pontos} = req.body
    
    var emailError
    var nomeError
    var pontosError
    

    if(email == undefined || email == ''){
        emailError = 'O e-mail não pode ser vazio.'
    }
    if (nome.length < 4){
        nomeError = 'O nome é muito pequeno.'
    }
    if(nome == undefined || nome == ''){
        nomeError = 'O nome não pode ser vazio.'
    }
    if(pontos == undefined || pontos < 20){
        pontosError = 'Você não pode ter menos de 20 pontos.'
    }
    if(emailError != undefined || nomeError != undefined || pontosError != undefined){
        req.flash('emailError', emailError)
        req.flash('nomeError', nomeError)
        req.flash('pontosError', pontosError)

        req.flash('email', email)
        req.flash('nome', nome)
        req.flash('pontos', pontos)

        res.redirect('/')
    }else{
        res.send('Formulário preenchido corretamente!')
    }

})

app.listen(8080, (req, res) => {
    console.log('Servidor rodando!')
})
