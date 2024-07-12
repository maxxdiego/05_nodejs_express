## Métodos de criação de relacionamentos do Sequelize:

* hasOne (tem um)
* belongsTo (pertence a)
* hasMany (tem muitos)
* belongsToMany (pertence a muitos)

<hr>

### Criando o model de Endereços:

```bash
Endereco.js:

import Sequelize from "sequelize"
import connection from "../config/sequelize-config.js"

const Endereco = connection.define('enderecos', {
    rua:{
        type: Sequelize.STRING,
        allowNull: false
    },
    numero:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bairro:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Endereco.sync({force: false})

export default Endereco
```

### Modificando o model de Clientes:

```bash
Cliente.js:

import Sequelize from "sequelize"
import connection from "../config/sequelize-config.js"
import Endereco from "./Endereco.js" // Importando o modelo Endereco

const Cliente = connection.define('clientes', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Endereco, // Referenciando o modelo Endereco
            key: 'id' // Referenciando a coluna 'id' do Endereco
        }
    }
})

// Definindo a associação
Cliente.belongsTo(Endereco, { foreignKey: 'endereco_id' });

Cliente.sync({force: false})

export default Cliente
```

### Alterando o ClientesController para fazer um INNER JOIN no SELECT

```bash
ClientesController.js:

// ROTA CLIENTES
router.get("/clientes", function(req, res){
    Cliente.findAll({
        include: [{
            model: Endereco,
            required: true // Faz um INNER JOIN
        }]
    }).then(clientes => {
        res.render("clientes", {
            clientes: clientes
        })
    })
})
```

### Modificando a view para renderizar as informações das duas tabelas:

```bash
clientes.ejs:

...
<thead>
    <tr>
        <th>Nome:</th>
        <th>CPF:</th>
        <th>Rua:</th>
        <th>Número:</th>
        <th>Bairro:</th>
        <th colspan="2">Ações:</th>
    </tr>
</thead>
<tbody>
    <% clientes.forEach(cliente => { %>
    <tr>
        <td><%= cliente.nome %></td>
        <td><%= cliente.cpf %></td>
        <td><%= cliente.endereco.rua %></td>
        <td><%= cliente.endereco.numero %></td>
        <td><%= cliente.endereco.bairro %></td>
...

```

### Alterando a view clientes.ejs com os campos adicionais de endereço:

```bash
clientes.ejs:

<label>Rua:</label>
<input type="text" name="rua" id="rua" placeholder="Insira a rua do endereço do cliente" class="form-control" required>

<label>Número:</label>
<input type="text" name="numero" id="numero" placeholder="Insira o número do endereço do cliente" class="form-control" required>

<label>Bairro:</label>
<input type="text" name="bairro" id="bairro" placeholder="Insira o bairro do endereço do cliente" class="form-control" required>

```

### Alterando a rota de cadastro para cadastrar Cliente e Endereço juntos:

```bash
ClientesController.js:

// ROTA DE CADASTRO DE CLIENTES
router.post("/clientes/new", (req, res) => {
  const { nome, cpf, rua, numero, bairro } = req.body;

  // Primeiro, cria o endereço
  Endereco.create({
    rua: rua,
    numero: numero,
    bairro: bairro,
  })
    .then((novoEndereco) => {
      // Em seguida, cria o cliente com a referência ao endereço criado
      Cliente.create({
        nome: nome,
        cpf: cpf,
        endereco_id: novoEndereco.id, // Supondo que a coluna 'id' é a chave primária de Endereco
      });
    })
    .catch((error) => {
      console.log("Erro ao cadastrar cliente e endereço: ", error);
    });
  res.redirect("/clientes");
});
```

### Alterando a rota de edição de clientes para recuperar também as informações da tabela endereços:

```bash
ClientesController.js:

// ROTA DE EDIÇÃO DE CLIENTES
router.get("/clientes/edit/:id", (req, res) => {
  const id = req.params.id;
  Cliente.findByPk(id, {
    include: [{
        model: Endereco,
        required: true, // Faz um INNER JOIN
      }]
  }).then(cliente => {
    res.render("clienteEdit", {
      cliente: cliente,
    });
  });
});
```

### Alterando a view clienteEdit.ejs com os campos adicionais de endereço:

```bash
clienteEdit.ejs

<label>Rua:</label>
<input type="text" name="rua" id="rua" value="<%= cliente.endereco.rua %>" class="form-control" required>

<label>Número:</label>
<input type="text" name="numero" id="numero" value="<%= cliente.endereco.numero %>" class="form-control" required>

<label>Bairro:</label>
<input type="text" name="bairro" id="bairro" value="<%= cliente.endereco.bairro %>" class="form-control" required>
<br>

<input type="hidden" name="id" value="<%= cliente.id %>">
<input type="hidden" name="id_endereco" value="<%= cliente.endereco.id %>">    
```

### Alterando a rota de alteração de cliente para alterar as informações do Endereço e Cliente juntos:

```bash
ClientesController.js:

// ROTA DE ALTERAÇÃO DE CLIENTES
router.post("/clientes/update/:id", (req, res) => {
  const { id, nome, cpf, rua, numero, bairro, id_endereco } = req.body;

  Endereco.update(
    {
      rua: rua,
      numero: numero,
      bairro: bairro,
    },
    { where: { id: id_endereco } }
  )
    .then(() => {
      Cliente.update(
        {
          nome: nome,
          cpf: cpf,
        },
        { where: { id: id } }
      )
        .then(() => {
          res.redirect("/clientes");
        })
        .catch((error) => {
          console.log("Erro ao alterar cliente." + error);
        });
    })
    .catch((error) => {
      console.log("Erro ao alterar o endereço." + error);
    });
});
```
### Alterando a rota de exclusão de cliente para excluir as informações do Endereço e Cliente juntos:

```bash
ClientesController.js:

// ROTA DE EXCLUSÃO DE CLIENTES
router.get("/clientes/delete/:id", (req, res) => {
  const id = req.params.id;
  Cliente.findByPk(id, {
    include: [
      {
        model: Endereco,
        required: true, // Faz um INNER JOIN
      },
    ],
  }).then((cliente) => {
    Cliente.destroy({
      where: {
        id: id,
      },
    }).then(() => {
      Endereco.destroy({
        where: {
          id: cliente.endereco_id,
        },
      });
    });
    res.redirect("/clientes");
  });
});

```
