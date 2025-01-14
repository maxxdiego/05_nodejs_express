// Importando o Express
import express from "express" 
// Iniciando o Express
const app = express() 
// Importando o Sequelize
import connection from "./config/sequelize-config.js" 
// Importando os Controllers
import ClientesController from "./controllers/ClientesController.js"
import PedidosController from "./controllers/PedidosController.js"
import ProdutosController from "./controllers/ProdutosController.js"
import Cliente from "./models/Cliente.js";
import Pedido from "./models/Pedido.js";
import defineAssociations from "./config/associations.js";

// Realizando a conexão com o banco de dados
connection.authenticate().then(()=> {
    console.log("Conexão com o banco de dados feita com sucesso!")
}).catch((error) => {
    console.log(error)
})

// Criando o banco de dados se ele não existir
connection.query(`CREATE DATABASE IF NOT EXISTS loja;`).then(() => {
    console.log("O banco de dados está criado.")
}).catch((error) => {
    console.log(error)
})

// Definir associações
defineAssociations();

// Sincronizar os modelos
Promise.all([
  Cliente.sync({ force: false }),
  Pedido.sync({ force: false }),
])
  .then(() => {
    console.log("Modelos e associações sincronizados com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar os modelos:", err);
  });

// Define o EJS como Renderizador de páginas
app.set('view engine', 'ejs')
// Define o uso da pasta "public" para uso de arquivos estáticos
app.use(express.static('public'))
// Permite capturar dados vindo de formulários
app.use(express.urlencoded({extended: false}))
app.use(express.json())
// Definindo o uso das rotas dos Controllers
app.use("/", ClientesController)
app.use("/", PedidosController)
app.use("/", ProdutosController)

// ROTA PRINCIPAL
app.get("/", function(req,res){
    res.render("index")
})

// INICIA O SERVIDOR NA PORTA 8080
app.listen(8080, erro => {
    if (erro) {
        console.log("Ocorreu um erro!")
    } else {
        console.log("Servidor iniciado com sucesso!")
    }
})