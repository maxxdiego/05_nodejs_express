import express from "express";//Importando o Express
import mongoose from "mongoose";//Importando o Mongoose
import bodyParser from "body-parser";//Importando a biblioteca body-parser
import bcrypt from "bcrypt" // Importando bcrypt (hash de senha)
import session from "express-session" //Importando gerador de sessões express
import ClientService from "./services/ClientService.js";// Importando os Service de Cliente
import PedidoService from "./services/PedidoService.js";// Importando os Service de Pedido
import ProdutoService from "./services/ProdutoService.js";// Importando os Service de Produto
import UserService from "./services/UserService.js";
import Auth from "./middleware/Auth.js"
const app = express(); //Iniciando o Express

app.use(bodyParser.urlencoded({ extended: false })); // Decodifica os dados recebidos
app.use(bodyParser.json()); //Permite receber dados via json

// Iniciando conexão com o banco de dados do MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/loja1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Indica ao Express a pasta public para arquivos estáticos
app.use(express.static("public"));

// Indicando o express-session para gerador de sessões
app.use(session({
  secret: "lojasecret",
  cookie: {maxAge: 30000}, //Sessão expira em 30 segundos
  saveUninitialized: false,
  resave: false
}))

// Define o EJS como Renderizador de páginas
app.set("view engine", "ejs");

// ROTA PRINCIPAL
app.get("/", Auth,  function (req, res) {
  res.render("index");
});

// ROTA DE LOGIN
app.get("/login", (req, res) => {
  res.render("login")
})

// ROTA DE LOGOUT
app.get("/logout", (req, res) => {
  req.session.user = undefined
  res.redirect("/")
})

// ROTA DE CADASTRO DE USUÁRIO
app.get("/cadastro", (req, res) => {
  res.render("cadastro")
})

// ROTA DE CRIAÇÃO DE USUÁRIO NO BANCO
app.post("/createUser", (req, res) => {
  // COLETANDO INFORMAÇÕES DO CORPO DA REQUISIÇÃO
  const email = req.body.email
  const password = req.body.password

  UserService.GetOne(email).then(user => {
    if(user == undefined){
      // AQUI SERÁ FEITO O CADASTRO
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)

      UserService.Create(email, hash)
      res.redirect("/login")
      // CASO JÁ TENHA USUÁRIO CADASTRADO
    }else{
      res.send(`Usuário já cadastrado!
      <br><a href="/login">Tentar novamente.</a>`)
    }
  })
})

// ROTA DE AUTENTICAÇÃO
app.post("/authenticate", (req, res) => {
  const email = req.body.email
  const password = req.body.password

  UserService.GetOne(email).then(user => {
    if (user != undefined) { //Se o usuário existe
      // Validar senha
      const correct = bcrypt.compareSync(password, user.password)
      if(correct){
        // Autorizar o login
        req.session.user = {
          id: user._id,
          email: user.email
        }
        res.redirect("/")
      } else {
        // Informar senha incorreta
        res.send(`Você digitou a senha incorretamente.
        <br><a href="/login">Tentar novamente.</a>`)
      }
    } else {
      // Informa usuário incorreto
      res.send(`Usuário não existe.
      <br><a href="/login">Tentar novamente.</a>`)
    }
  })
})

// ROTA CLIENTES
app.get("/clientes", Auth, (req, res) => {
  ClientService.GetAll().then((clients) => {
    res.render("clientes", {
      clients: clients,
    });
  });
});

// ROTA DE CRIAÇÃO DE CLIENTES
app.post("/createClient", Auth, (req, res) => {
  ClientService.Create(req.body.name, req.body.cpf, req.body.address);
  res.redirect("/clientes");
});

// ROTA DE EXCLUSÃO DE CLIENTE
app.get("/deleteClient/:id", Auth, (req, res) => {
  const id = req.params.id;
  ClientService.Delete(id);
  res.redirect("/clientes");
});

// ROTA DE BUSCA DE CLIENTE
app.get("/findClient/:id", Auth, (req, res) => {
  const id = req.params.id;
  ClientService.GetOne(id).then((Client) => {
    res.render("dadoscliente", {
      Client: Client,
    });
  });
});

// ROTA DE ALTERAÇÃO DE CLIENTE
app.post("/updateClient/:id", Auth, (req, res) => {
  ClientService.Update(
    req.body.id,
    req.body.name,
    req.body.cpf,
    req.body.address
  );
  res.redirect("/clientes");
});

// ROTA PRODUTOS
app.get("/produtos", Auth, (req, res) => {
  ProdutoService.GetAll().then((produtos) => {
    res.render("produtos", {
      produtos,
    });
  });
});

// ROTA DE CRIAÇÃO PRODUTOS
app.post("/createProdutos", Auth, (req, res) => {
  const { nome, preco, categoria } = req.body;
  ProdutoService.Create(nome, preco, categoria);
  res.redirect("/produtos");
});

// ROTA DE EXCLUSÃO PRODUTOS
app.get("/deleteProdutos/:id", Auth, (req, res) => {
  const id = req.params.id;
  ProdutoService.Delete(id);
  res.redirect("/produtos");
});

// ROTA DE BUSCA DE PRODUTO
app.get("/findProdutos/:id", Auth, (req, res) => {
  const id = req.params.id;
  ProdutoService.GetOne(id).then((produtos) => {
    res.render("dadosproduto", {
      produtos,
    });
  });
});

// ROTA DE ALTERAÇÃO DE PRODUTO
app.post("/updateProdutos/:id", Auth, (req, res) => {
  const { id, nome, valor, categoria } = req.body;
  ProdutoService.Update(id, nome, valor, categoria);
  res.redirect("/produtos");
});

// ROTA PEDIDOS
app.get("/pedidos", Auth, (req, res) => {
  PedidoService.GetAll().then((pedidos) => {
    res.render("pedidos", {
      pedidos,
    });
  });
});

// ROTA DE CRIAÇÃO DE PEDIDOS
app.post("/createPedido", Auth, (req, res) => {
  PedidoService.Create(req.body.numero, req.body.valor);
  res.redirect("/pedidos");
});

// ROTA DE EXCLUSÃO DE PEDIDOS
app.get("/deletePedidos/:id", Auth, (req, res) => {
  const id = req.params.id;
  PedidoService.Delete(id);
  res.redirect("/pedidos");
});

// ROTA DE BUSCA DE PEDIDO
app.get("/findPedidos/:id", Auth, (req, res) => {
  const id = req.params.id;
  PedidoService.GetOne(id).then((pedidos) => {
    res.render("dadospedidos", {
      pedidos: pedidos,
    });
  });
});

// ROTA DE ALTERAÇÃO DE PEDIDO
app.post("/updatePedidos/:id", Auth, (req, res) => {
  PedidoService.Update(req.body.id, req.body.numero, req.body.valor);
  res.redirect("/pedidos");
});

// INICIA O SERVIDOR NA PORTA 8080
app.listen(8080, function (erro) {
  if (erro) {
    console.log("Ocorreu um erro!");
  } else {
    console.log("Servidor iniciado com sucesso!");
  }
});
