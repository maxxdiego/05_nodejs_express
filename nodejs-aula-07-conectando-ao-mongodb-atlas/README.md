## Conectando a aplicação ao MongoDB Atlas

### Variáveis de ambiente:
```bash
npm install dotenv
```

### config/db-connection.js:
```bash
// Importando o mongoose
import mongoose from "mongoose";
// Importando as variáveis de ambiente
import dotenv from 'dotenv';
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connect = () => {
  mongoose.connect(``);

  const connection = mongoose.connection;

  connection.on("error", () => {
    console.log("Erro ao conectar com o mongoDB.");
  });

  connection.on("open", () => {
    console.log("Conectado ao mongoDB com sucesso!");
  });
};

connect();

export default mongoose;
```

### .env file:
```bash
# Configurando as variáveis de ambiente
DB_USER="usuario"
DB_PASS="senha"
PORT="8080"
```

### index.js:

```bash
// Importando as variáveis de ambiente
import dotenv from 'dotenv';
dotenv.config();
```

```bash
// Importando a conexão com o banco de dados
import mongoose from "./config/db-connection.js";
```

```bash
// INICIA O SERVIDOR NA PORTA 8080
const port = process.env.PORT || 8080;
app.listen(port, function (erro) {
  if (erro) {
    console.log("Ocorreu um erro!");
  } else {
    console.log("Servidor iniciado com sucesso em http://localhost:" + port);
  }
});
```